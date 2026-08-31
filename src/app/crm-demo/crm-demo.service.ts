import { Injectable, computed, signal } from '@angular/core';
import { Lead, NewLeadInput, PIPELINE_STAGES, PipelineStage } from './crm-demo.model';

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function seedLeads(): Lead[] {
  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  const base: Array<Omit<Lead, 'id' | 'notes'>> = [
    { name: 'Anna Brandt', email: 'anna.brandt@example.com', phone: '+49 151 2233445', company: 'Brandt Physiotherapie', sourceIndex: 0, value: 890, stage: 'new', createdAt: now - day * 1 },
    { name: 'Mert Kaya', email: 'mert.kaya@example.com', phone: '+90 532 111 22 33', company: 'Kaya Danışmanlık', sourceIndex: 1, value: 2400, stage: 'new', createdAt: now - day * 2 },
    { name: 'Julia Hoffmann', email: 'julia.hoffmann@example.com', phone: '+49 176 9988776', company: 'Hoffmann Coaching', sourceIndex: 2, value: 1200, stage: 'contacted', createdAt: now - day * 3 },
    { name: 'Deniz Aksoy', email: 'deniz.aksoy@example.com', phone: '+90 505 444 55 66', company: 'Aksoy Güzellik Salonu', sourceIndex: 4, value: 650, stage: 'contacted', createdAt: now - day * 4 },
    { name: 'Lukas Bauer', email: 'lukas.bauer@example.com', phone: '+49 160 3344556', company: 'Bauer Fahrschule', sourceIndex: 3, value: 1800, stage: 'booked', createdAt: now - day * 5 },
    { name: 'Selin Yıldız', email: 'selin.yildiz@example.com', phone: '+90 542 222 33 44', company: 'Yıldız Danışmanlık', sourceIndex: 0, value: 3100, stage: 'completed', createdAt: now - day * 7 },
    { name: 'Fabian Wolf', email: 'fabian.wolf@example.com', phone: '+49 173 5566778', company: 'Wolf Zahnarztpraxis', sourceIndex: 1, value: 950, stage: 'followup', createdAt: now - day * 10 },
    { name: 'Ece Demir', email: 'ece.demir@example.com', phone: '+90 533 777 88 99', company: 'Demir Emlak', sourceIndex: 2, value: 500, stage: 'lost', createdAt: now - day * 14 }
  ];

  return base.map((lead) => ({ ...lead, id: makeId(), notes: [] }));
}

@Injectable({ providedIn: 'root' })
export class CrmDemoService {
  readonly stages = PIPELINE_STAGES;

  private readonly _leads = signal<Lead[]>(seedLeads());
  readonly leads = this._leads.asReadonly();

  readonly leadCount = computed(() => this._leads().length);

  leadsByStage(stage: PipelineStage): Lead[] {
    return this._leads()
      .filter((lead) => lead.stage === stage)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  getLead(id: string): Lead | undefined {
    return this._leads().find((lead) => lead.id === id);
  }

  createLead(input: NewLeadInput): Lead {
    const lead: Lead = {
      id: makeId(),
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      company: input.company.trim(),
      sourceIndex: input.sourceIndex,
      value: Number.isFinite(input.value) ? input.value : 0,
      stage: 'new',
      createdAt: Date.now(),
      notes: input.note.trim() ? [{ id: makeId(), text: input.note.trim(), timestamp: Date.now() }] : []
    };
    this._leads.update((list) => [lead, ...list]);
    return lead;
  }

  moveLead(id: string, toStage: PipelineStage): void {
    this._leads.update((list) => list.map((lead) => (lead.id === id ? { ...lead, stage: toStage } : lead)));
  }

  addNote(id: string, text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    this._leads.update((list) =>
      list.map((lead) =>
        lead.id === id ? { ...lead, notes: [{ id: makeId(), text: trimmed, timestamp: Date.now() }, ...lead.notes] } : lead
      )
    );
  }

  deleteLead(id: string): void {
    this._leads.update((list) => list.filter((lead) => lead.id !== id));
  }

  /** Resets the demo back to the original seed data. */
  reset(): void {
    this._leads.set(seedLeads());
  }
}
