export type PipelineStage = 'new' | 'contacted' | 'booked' | 'completed' | 'followup' | 'lost';

export const PIPELINE_STAGES: PipelineStage[] = ['new', 'contacted', 'booked', 'completed', 'followup', 'lost'];

export interface LeadNote {
  id: string;
  text: string;
  timestamp: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  /** Index into the translated `crm.form.sources` list. */
  sourceIndex: number;
  value: number;
  stage: PipelineStage;
  notes: LeadNote[];
  createdAt: number;
}

export interface NewLeadInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  sourceIndex: number;
  value: number;
  note: string;
}
