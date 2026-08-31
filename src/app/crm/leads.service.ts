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

@Injectable({ providedIn: 'root' })
export class LeadsService implements OnDestroy {
  private supabase = inject(SupabaseService).client;
  private channel: RealtimeChannel | null = null;

  readonly stages = PIPELINE_STAGES;
  readonly leads = signal<Lead[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    console.log('[LeadsService] Initializing...');
    this.fetchLeads();
    this.subscribeToChanges();
  }

  async fetchLeads(): Promise<void> {
    this.loading.set(true);
    console.log('[LeadsService] Fetching leads from Supabase...');
    
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[LeadsService] Supabase error:', error);
        this.error.set(error.message);
        this.loading.set(false);
        this.leads.set([]); // Keine Mock-Daten, nur leeres Array
        return;
      }

      console.log('[LeadsService] Fetched leads:', data?.length || 0);
      this.error.set(null);
      this.leads.set(data ?? []);
      this.loading.set(false);
      
    } catch (err) {
      console.error('[LeadsService] fetchLeads exception:', err);
      this.error.set('Verbindungsfehler');
      this.loading.set(false);
      this.leads.set([]); // Keine Mock-Daten
    }
  }

  private subscribeToChanges(): void {
    this.channel = this.supabase
      .channel('leads-pipeline')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        console.log('[LeadsService] Realtime update received');
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
    try {
      const { error } = await this.supabase
        .from('leads')
        .insert({
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone.trim() || null,
          notes: input.notes.trim() || null
        });

      if (error) {
        console.error('[LeadsService] createLead failed:', error);
        return { error: error.message };
      }
      return { error: null };
    } catch (err: any) {
      console.error('[LeadsService] createLead exception:', err);
      return { error: err.message || 'Unknown error' };
    }
  }

  async moveLead(id: string, status: LeadStatus): Promise<void> {
    // Optimistisches Update
    this.leads.update((list) => list.map((lead) => (lead.id === id ? { ...lead, status } : lead)));

    try {
      const { error } = await this.supabase
        .from('leads')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('[LeadsService] moveLead failed:', error);
        this.fetchLeads(); // Zurücksetzen auf echten Stand
      }
    } catch (err) {
      console.error('[LeadsService] moveLead exception:', err);
      this.fetchLeads();
    }
  }

  async updateNotes(id: string, notes: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('leads')
        .update({ notes: notes.trim() || null })
        .eq('id', id);

      if (error) {
        console.error('[LeadsService] updateNotes failed:', error);
      }
    } catch (err) {
      console.error('[LeadsService] updateNotes exception:', err);
    }
  }

  async deleteLead(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('[LeadsService] deleteLead failed:', error);
      }
    } catch (err) {
      console.error('[LeadsService] deleteLead exception:', err);
    }
  }

  ngOnDestroy(): void {
    if (this.channel) {
      this.supabase.removeChannel(this.channel);
    }
  }
}
