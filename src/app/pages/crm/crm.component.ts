import { Component, computed, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../i18n/language.service';
import { LeadsService } from '../../crm/leads.service';
import { LeadStatus } from '../../supabase/supabase.types';
import { PipelineBoardComponent } from '../../crm/components/pipeline-board.component';
import { LeadListComponent } from '../../crm/components/lead-list.component';
import { LeadFormComponent } from '../../crm/components/lead-form.component';
import { LeadDetailComponent } from '../../crm/components/lead-detail.component';

type ViewMode = 'board' | 'list';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [PipelineBoardComponent, LeadListComponent, LeadFormComponent, LeadDetailComponent],
  template: `
    <section class="page-hero crm-hero">
      <p class="eyebrow">{{ i18n.t('crm.eyebrow') }}</p>
      <h1>{{ i18n.t('crm.title') }}</h1>
      <p>{{ i18n.t('crm.text') }}</p>
    </section>

    @if (successMessage()) {
      <p class="notice">{{ successMessage() }}</p>
    }
    @if (leadsService.error(); as err) {
      <p class="notice notice-error">{{ err }}</p>
    }

    <div class="crm-toolbar">
      <div class="view-toggle">
        <button type="button" [class.active]="view() === 'board'" (click)="view.set('board')">{{ i18n.t('crm.viewPipeline') }}</button>
        <button type="button" [class.active]="view() === 'list'" (click)="view.set('list')">{{ i18n.t('crm.viewList') }}</button>
      </div>
      <button type="button" class="btn btn-primary" (click)="showForm.set(true)">{{ i18n.t('crm.newLeadBtn') }}</button>
    </div>

    @if (leadsService.loading()) {
      <p>{{ i18n.t('crm.loading') }}</p>
    } @else if (view() === 'board') {
      <app-pipeline-board
        [leads]="leadsService.leads()"
        [stages]="leadsService.stages"
        (open)="selectedLeadId.set($event)"
        (moveTo)="onMove($event)"
      />
    } @else {
      <app-lead-list [leads]="leadsService.leads()" (open)="selectedLeadId.set($event)" />
    }

    @if (showForm()) {
      <app-lead-form (created)="onCreated()" (cancel)="showForm.set(false)" />
    }

    @if (selectedLead(); as lead) {
      <app-lead-detail
        [lead]="lead"
        [stages]="leadsService.stages"
        (close)="selectedLeadId.set(null)"
        (moveTo)="onMove($event)"
        (deleted)="selectedLeadId.set(null)"
      />
    }
  `
})
export class CrmComponent {
  i18n = inject(LanguageService);
  leadsService = inject(LeadsService);
  private titleService = inject(Title);

  view = signal<ViewMode>('board');
  showForm = signal(false);
  selectedLeadId = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  selectedLead = computed(() => {
    const id = this.selectedLeadId();
    return id ? this.leadsService.getLead(id) : undefined;
  });

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.i18n.t('crm.pageTitle')} | Oguz Han Yavuz`);
    });
  }

  onCreated(): void {
    this.showForm.set(false);
    this.successMessage.set(this.i18n.t('crm.createdNotice'));
    setTimeout(() => this.successMessage.set(null), 5000);
  }

  onMove(event: { id: string; status: LeadStatus }): void {
    this.leadsService.moveLead(event.id, event.status);
  }
}
