import { Injectable, signal } from '@angular/core';
import { Lead, LeadStatus } from '../supabase/supabase.types';

export const PIPELINE_STAGES: LeadStatus[] = ['NEW', 'IN_PROGRESS', 'WON', 'LOST'];

export interface NewLeadInput {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class LeadsService {
  readonly stages = PIPELINE_STAGES;
  readonly leads = signal<Lead[]>([
    {
      id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: 'Anna Brandt',
      email: 'anna@brandt-physio.de',
      phone: '+491511234567',
      status: 'NEW',
      notes: 'Erster Kontakt per E-Mail'
    },
    {
      id: '2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: 'Mert Kaya',
      email: 'mert@kaya-danisma.com',
      phone: '+491522345678',
      status: 'IN_PROGRESS',
      notes: 'Angebot wurde versendet'
    }
  ]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  leadsByStage(stage: LeadStatus): Lead[] {
    return this.leads().filter((lead) => lead.status === stage);
  }

  getLead(id: string): Lead | undefined {
    return this.leads().find((lead) => lead.id === id);
  }

  async createLead(input: NewLeadInput): Promise<{ error: string | null }> {
    const newLead: Lead = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim() || null,
      status: 'NEW',
      notes: input.notes.trim() || null
    };
    this.leads.update((list) => [newLead, ...list]);
    return { error: null };
  }

  async moveLead(id: string, status: LeadStatus): Promise<void> {
    this.leads.update((list) => list.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  }

  async updateNotes(id: string, notes: string): Promise<void> {
    this.leads.update((list) => list.map((lead) => (lead.id === id ? { ...lead, notes: notes.trim() || null } : lead)));
  }

  async deleteLead(id: string): Promise<void> {
    this.leads.update((list) => list.filter((lead) => lead.id !== id));
  }
}
