import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { Lead, LeadStatus } from '../supabase/supabase.types';

export const PIPELINE_STAGES: LeadStatus[] = ['NEW', 'IN_PROGRESS', 'WON', 'LOST'];

export interface NewLeadInput {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

// Typ für die Leads-Tabelle
interface LeadInsert {
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
}

interface LeadUpdate {
  status?: LeadStatus;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class LeadsService implements OnDestroy {
  private supabase = inject(SupabaseService).client;
  private channel: RealtimeChannel | null = null;

  readonly stages = PIPELINE_STAGES;
  readonly leads = signal<Lead[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.fetchLeads();
    this.subscribeToChanges();
  }

  async fetchLeads(): Promise<void> {
    this.loading.set(true);
    const { data, error } = await this.supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      this.error.set(error.message);
      console.error('[LeadsService] fetchLeads failed:', error);
    } else {
      this.error.set(null);
      this.leads.set(data ?? []);
    }
    this.loading.set(false);
  }

  private subscribeToChanges(): void {
    this.channel = this.supabase
      .channel('leads-pipeline')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        this.fetchLeads();
      })
      .subscribe();
  }

  leadsByStage(stage: LeadStatus): Lead[] {
    return this.leads().filter((lead) => lead.status === stage);
  }

  getLead(id: string): Lead | undefined {
    return this.leads().find((lead) => lead.id === id);
  }

  async createLead(input: NewLeadInput): Promise<{ error: string | null }> {
    const newLead: LeadInsert = {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim() || null,
      notes: input.notes.trim() || null
    };

    const { error } = await this.supabase
      .from('leads')
      .insert(newLead);

    if (error) {
      console.error('[LeadsService] createLead failed:', error);
      return { error: error.message };
    }
    return { error: null };
  }

  async moveLead(id: string, status: LeadStatus): Promise<void> {
    this.leads.update((list) => list.map((lead) => (lead.id === id ? { ...lead, status } : lead)));

    const update: LeadUpdate = { status };
    const { error } = await this.supabase
      .from('leads')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('[LeadsService] moveLead failed:', error);
      this.fetchLeads();
    }
  }

  async updateNotes(id: string, notes: string): Promise<void> {
    const update: LeadUpdate = { notes: notes.trim() || null };
    const { error } = await this.supabase
      .from('leads')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('[LeadsService] updateNotes failed:', error);
    }
  }

  async deleteLead(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[LeadsService] deleteLead failed:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.channel) {
      this.supabase.removeChannel(this.channel);
    }
  }
}
