import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lead, PipelineStage } from '../crm-demo.model';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [FormsModule, DecimalPipe, DatePipe],
  template: `
    <div class="drawer-overlay" (click)="close.emit()">
      <aside class="drawer" (click)="$event.stopPropagation()">
        <button type="button" class="drawer-close" (click)="close.emit()">✕</button>

        <h2>{{ lead.name }}</h2>
        <span class="stage-pill">{{ i18n.t('crm.stages.' + lead.stage) }}</span>

        <div class="drawer-section">
          <span class="drawer-label">{{ i18n.t('crm.detail.contactLabel') }}</span>
          <p><a [href]="'mailto:' + lead.email">{{ lead.email }}</a></p>
          @if (lead.phone) {
            <p><a [href]="'tel:' + lead.phone">{{ lead.phone }}</a></p>
          }
          @if (lead.company) {
            <p>{{ lead.company }}</p>
          }
        </div>

        <div class="drawer-grid">
          <div>
            <span class="drawer-label">{{ i18n.t('crm.detail.sourceLabel') }}</span>
            <p>{{ i18n.list('crm.form.sources')[lead.sourceIndex] }}</p>
          </div>
          <div>
            <span class="drawer-label">{{ i18n.t('crm.detail.valueLabel') }}</span>
            <p>{{ lead.value | number }}&nbsp;€</p>
          </div>
          <div>
            <span class="drawer-label">{{ i18n.t('crm.detail.createdLabel') }}</span>
            <p>{{ lead.createdAt | date: 'mediumDate' }}</p>
          </div>
        </div>

        <div class="drawer-section">
          <span class="drawer-label">{{ i18n.t('crm.detail.moveTitle') }}</span>
          <div class="stage-buttons">
            @for (stage of stages; track stage) {
              <button
                type="button"
                class="stage-btn"
                [class.active]="stage === lead.stage"
                (click)="moveTo.emit({ id: lead.id, stage })"
              >{{ i18n.t('crm.stages.' + stage) }}</button>
            }
          </div>
        </div>

        <div class="drawer-section">
          <span class="drawer-label">{{ i18n.t('crm.detail.notesTitle') }}</span>

          <form class="note-form" (ngSubmit)="submitNote()">
            <textarea [(ngModel)]="noteDraft" name="note" [placeholder]="i18n.t('crm.detail.addNotePlaceholder')"></textarea>
            <button type="submit" class="btn btn-ghost">{{ i18n.t('crm.detail.addNoteBtn') }}</button>
          </form>

          @if (lead.notes.length) {
            <ul class="note-list">
              @for (note of lead.notes; track note.id) {
                <li>
                  <p>{{ note.text }}</p>
                  <small>{{ note.timestamp | date: 'short' }}</small>
                </li>
              }
            </ul>
          } @else {
            <p class="column-empty">{{ i18n.t('crm.detail.noNotes') }}</p>
          }
        </div>

        <button type="button" class="btn btn-danger" (click)="deleteLead.emit(lead.id)">{{ i18n.t('crm.detail.deleteBtn') }}</button>
      </aside>
    </div>
  `
})
export class LeadDetailComponent {
  @Input({ required: true }) lead!: Lead;
  @Input({ required: true }) stages: PipelineStage[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() moveTo = new EventEmitter<{ id: string; stage: PipelineStage }>();
  @Output() addNote = new EventEmitter<{ id: string; text: string }>();
  @Output() deleteLead = new EventEmitter<string>();

  i18n = inject(LanguageService);
  noteDraft = '';

  submitNote(): void {
    if (!this.noteDraft.trim()) {
      return;
    }
    this.addNote.emit({ id: this.lead.id, text: this.noteDraft });
    this.noteDraft = '';
  }
}
