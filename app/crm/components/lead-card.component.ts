import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Lead, LeadStatus } from '../../supabase/supabase.types';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-card',
  standalone: true,
  template: `
    <article class="lead-card" draggable="true" (dragstart)="onDragStart($event)" (click)="open.emit(lead.id)">
      <strong>{{ lead.name }}</strong>
      <p class="lead-company">{{ lead.email }}</p>
      @if (lead.phone) {
        <p class="lead-company">{{ lead.phone }}</p>
      }

      <div class="lead-card-actions">
        <button
          type="button"
          class="lead-move-btn"
          [disabled]="!previousStage"
          [title]="previousStage ? i18n.t('crm.stages.' + previousStage) : ''"
          (click)="move($event, previousStage)"
        >←</button>
        <span class="lead-stage-label">{{ i18n.t('crm.stages.' + lead.status) }}</span>
        <button
          type="button"
          class="lead-move-btn"
          [disabled]="!nextStage"
          [title]="nextStage ? i18n.t('crm.stages.' + nextStage) : ''"
          (click)="move($event, nextStage)"
        >→</button>
      </div>
    </article>
  `
})
export class LeadCardComponent {
  @Input({ required: true }) lead!: Lead;
  @Input() previousStage: LeadStatus | null = null;
  @Input() nextStage: LeadStatus | null = null;

  @Output() open = new EventEmitter<string>();
  @Output() moveTo = new EventEmitter<{ id: string; status: LeadStatus }>();

  i18n = inject(LanguageService);

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', this.lead.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  move(event: Event, status: LeadStatus | null): void {
    event.stopPropagation();
    if (status) {
      this.moveTo.emit({ id: this.lead.id, status });
    }
  }
}
