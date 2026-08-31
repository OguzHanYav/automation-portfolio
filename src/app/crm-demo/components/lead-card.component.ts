import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Lead, PipelineStage } from '../crm-demo.model';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-card',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <article
      class="lead-card"
      draggable="true"
      (dragstart)="onDragStart($event)"
      (click)="open.emit(lead.id)"
    >
      <div class="lead-card-top">
        <strong>{{ lead.name }}</strong>
        <span class="lead-value">{{ lead.value | number }}&nbsp;€</span>
      </div>
      <p class="lead-company">{{ lead.company || lead.email }}</p>

      <div class="lead-card-actions">
        <button
          type="button"
          class="lead-move-btn"
          [disabled]="!previousStage"
          [title]="previousStage ? i18n.t('crm.stages.' + previousStage) : ''"
          (click)="move($event, previousStage)"
        >←</button>
        <span class="lead-stage-label">{{ i18n.t('crm.stages.' + lead.stage) }}</span>
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
  @Input() previousStage: PipelineStage | null = null;
  @Input() nextStage: PipelineStage | null = null;

  @Output() open = new EventEmitter<string>();
  @Output() moveTo = new EventEmitter<{ id: string; stage: PipelineStage }>();

  i18n = inject(LanguageService);

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', this.lead.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  move(event: Event, stage: PipelineStage | null): void {
    event.stopPropagation();
    if (stage) {
      this.moveTo.emit({ id: this.lead.id, stage });
    }
  }
}
