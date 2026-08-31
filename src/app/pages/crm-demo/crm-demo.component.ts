import { Component, computed, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../i18n/language.service';
import { CrmDemoService } from '../../crm-demo/crm-demo.service';
import { NewLeadInput, PipelineStage } from '../../crm-demo/crm-demo.model';
import { PipelineBoardComponent } from '../../crm-demo/components/pipeline-board.component';
import { LeadListComponent } from '../../crm-demo/components/lead-list.component';
import { LeadFormComponent } from '../../crm-demo/components/lead-form.component';
import { LeadDetailComponent } from '../../crm-demo/components/lead-detail.component';

type ViewMode = 'board' | 'list';

@Component({
  selector: 'app-crm-demo',
  standalone: true,
  imports: [PipelineBoardComponent, LeadListComponent, LeadFormComponent, LeadDetailComponent],
  template: `
    <section class="page-hero crm-hero">
      <p class="eyebrow">{{ i18n.t('crm.eyebrow') }}</p>
      <h1>{{ i18n.t('crm.title') }}</h1>
      <p>{{ i18n.t('crm.text') }}</p>
    </section>

    <div class="crm-toolbar">
      <div class="view-toggle">
        <button type="button" [class.active]="view() === 'board'" (click)="view.set('board')">{{ i18n.t('crm.viewPipeline') }}</button>
        <button type="button" [class.active]="view() === 'list'" (click)="view.set('list')">{{ i18n.t('crm.viewList') }}</button>
      </div>
      <button type="button" class="btn btn-primary" (click)="showForm.set(true)">{{ i18n.t('crm.newLeadBtn') }}</button>
    </div>

    @if (view() === 'board') {
      <app-pipeline-board
        [leads]="crm.leads()"
        [stages]="crm.stages"
        (open)="selectedLeadId.set($event)"
        (moveTo)="onMove($event)"
      />
    } @else {
      <app-lead-list [leads]="crm.leads()" (open)="selectedLeadId.set($event)" />
    }

    @if (showForm()) {
      <app-lead-form (create)="onCreate($event)" (cancel)="showForm.set(false)" />
    }

    @if (selectedLead(); as lead) {
      <app-lead-detail
        [lead]="lead"
        [stages]="crm.stages"
        (close)="selectedLeadId.set(null)"
        (moveTo)="onMove($event)"
        (addNote)="onAddNote($event)"
        (deleteLead)="onDelete($event)"
      />
    }
  `
})
export class CrmDemoComponent {
  i18n = inject(LanguageService);
  crm = inject(CrmDemoService);
  private titleService = inject(Title);

  view = signal<ViewMode>('board');
  showForm = signal(false);
  selectedLeadId = signal<string | null>(null);

  selectedLead = computed(() => {
    const id = this.selectedLeadId();
    return id ? this.crm.getLead(id) : undefined;
  });

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.i18n.t('crm.pageTitle')} | Oguz Han Yavuz`);
    });
  }

  onCreate(input: NewLeadInput): void {
    this.crm.createLead(input);
    this.showForm.set(false);
  }

  onMove(event: { id: string; stage: PipelineStage }): void {
    this.crm.moveLead(event.id, event.stage);
  }

  onAddNote(event: { id: string; text: string }): void {
    this.crm.addNote(event.id, event.text);
  }

  onDelete(id: string): void {
    if (confirm(this.i18n.t('crm.deleteConfirm'))) {
      this.crm.deleteLead(id);
      this.selectedLeadId.set(null);
    }
  }
}
