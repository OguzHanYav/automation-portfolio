import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lead, LeadStatus } from '../../supabase/supabase.types';
import { LanguageService } from '../../i18n/language.service';
import { LeadsService } from '../leads.service';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <div class="drawer-overlay" (click)="close.emit()">
      <aside class="drawer" (click)="$event.stopPropagation()">
        <button type="button" class="drawer-close" (click)="close.emit()">✕</button>

        <h2>{{ lead.name }}</h2>
        <span class="stage-pill">{{ i18n.t('crm.stages.' + lead.status) }}</span>

        <div class="drawer-section">
          <span class="drawer-label">{{ i18n.t('crm.detail.contactLabel') }}</span>
          <p><a [href]="'mailto:' + lead.email">{{ lead.email }}</a></p>
          @if (lead.phone) {
            <p><a [href]="'https://wa.me/' + lead.phone.replace('+','')" target="_blank" rel="noopener">{{ lead.phone }}</a></p>
          }
          <p class="lead-company">{{ i18n.t('crm.detail.createdLabel') }}: {{ lead.created_at | date: 'medium' }}</p>
        </div>

        <div class="drawer-section">
          <span class="drawer-label">{{ i18n.t('crm.detail.moveTitle') }}</span>
          <div class="stage-buttons">
            @for (stage of stages; track stage) {
              <button
                type="button"
                class="stage-btn"
                [class.active]="stage === lead.status"
                (click)="moveTo.emit({ id: lead.id, status: stage })"
              >{{ i18n.t('crm.stages.' + stage) }}</button>
            }
          </div>
        </div>

        <div class="drawer-section">
          <span class="drawer-label">{{ i18n.t('crm.detail.notesTitle') }}</span>
          <textarea class="note-form-textarea" [(ngModel)]="notesDraft" name="notes" [placeholder]="i18n.t('crm.detail.notesPlaceholder')"></textarea>
          <button type="button" class="btn btn-ghost" [disabled]="saving()" (click)="saveNotes()">
            {{ saving() ? i18n.t('crm.detail.saving') : i18n.t('crm.detail.saveNotesBtn') }}
          </button>
        </div>

        <button type="button" class="btn btn-danger" (click)="onDelete()">{{ i18n.t('crm.detail.deleteBtn') }}</button>
      </aside>
    </div>
  `
})
export class LeadDetailComponent {
  @Input({ required: true }) lead!: Lead;
  @Input({ required: true }) stages: LeadStatus[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() moveTo = new EventEmitter<{ id: string; status: LeadStatus }>();
  @Output() deleted = new EventEmitter<string>();

  private leadsService = inject(LeadsService);
  i18n = inject(LanguageService);

  notesDraft = '';
  saving = signal(false);

  ngOnChanges(): void {
    this.notesDraft = this.lead?.notes ?? '';
  }

  async saveNotes(): Promise<void> {
    this.saving.set(true);
    await this.leadsService.updateNotes(this.lead.id, this.notesDraft);
    this.saving.set(false);
  }

  async onDelete(): Promise<void> {
    if (!confirm(this.i18n.t('crm.detail.confirmDelete'))) {
      return;
    }
    await this.leadsService.deleteLead(this.lead.id);
    this.deleted.emit(this.lead.id);
  }
}
