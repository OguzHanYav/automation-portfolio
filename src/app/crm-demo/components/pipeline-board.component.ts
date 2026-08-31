import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { Lead, PipelineStage } from '../crm-demo.model';
import { LanguageService } from '../../i18n/language.service';
import { LeadCardComponent } from './lead-card.component';

@Component({
  selector: 'app-pipeline-board',
  standalone: true,
  imports: [LeadCardComponent],
  template: `
    <div class="pipeline-board">
      @for (stage of stages; track stage) {
        <section
          class="pipeline-column"
          [class.drag-over]="dragOverStage() === stage"
          (dragover)="onDragOver($event, stage)"
          (dragleave)="onDragLeave(stage)"
          (drop)="onDrop($event, stage)"
        >
          <header class="column-head">
            <span>{{ i18n.t('crm.stages.' + stage) }}</span>
            <span class="column-count">{{ leadsFor(stage).length }}</span>
          </header>

          <div class="column-body">
            @for (lead of leadsFor(stage); track lead.id) {
              <app-lead-card
                [lead]="lead"
                [previousStage]="stageBefore(stage)"
                [nextStage]="stageAfter(stage)"
                (open)="open.emit($event)"
                (moveTo)="moveTo.emit($event)"
              />
            } @empty {
              <p class="column-empty">{{ i18n.t('crm.list.empty') }}</p>
            }
          </div>
        </section>
      }
    </div>
  `
})
export class PipelineBoardComponent {
  @Input({ required: true }) leads: Lead[] = [];
  @Input({ required: true }) stages: PipelineStage[] = [];

  @Output() open = new EventEmitter<string>();
  @Output() moveTo = new EventEmitter<{ id: string; stage: PipelineStage }>();

  i18n = inject(LanguageService);
  dragOverStage = signal<PipelineStage | null>(null);

  leadsFor(stage: PipelineStage): Lead[] {
    return this.leads.filter((lead) => lead.stage === stage).sort((a, b) => b.createdAt - a.createdAt);
  }

  stageBefore(stage: PipelineStage): PipelineStage | null {
    const index = this.stages.indexOf(stage);
    return index > 0 ? this.stages[index - 1] : null;
  }

  stageAfter(stage: PipelineStage): PipelineStage | null {
    const index = this.stages.indexOf(stage);
    return index >= 0 && index < this.stages.length - 1 ? this.stages[index + 1] : null;
  }

  onDragOver(event: DragEvent, stage: PipelineStage): void {
    event.preventDefault();
    this.dragOverStage.set(stage);
  }

  onDragLeave(stage: PipelineStage): void {
    if (this.dragOverStage() === stage) {
      this.dragOverStage.set(null);
    }
  }

  onDrop(event: DragEvent, stage: PipelineStage): void {
    event.preventDefault();
    this.dragOverStage.set(null);
    const id = event.dataTransfer?.getData('text/plain');
    if (id) {
      this.moveTo.emit({ id, stage });
    }
  }
}
