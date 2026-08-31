import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Lead } from '../crm-demo.model';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  template: `
    <div class="lead-list-wrap">
      <table class="lead-list-table">
        <thead>
          <tr>
            <th>{{ i18n.t('crm.list.name') }}</th>
            <th>{{ i18n.t('crm.list.company') }}</th>
            <th>{{ i18n.t('crm.list.stage') }}</th>
            <th>{{ i18n.t('crm.list.value') }}</th>
            <th>{{ i18n.t('crm.list.source') }}</th>
            <th>{{ i18n.t('crm.list.created') }}</th>
          </tr>
        </thead>
        <tbody>
          @for (lead of sortedLeads(); track lead.id) {
            <tr (click)="open.emit(lead.id)">
              <td class="lead-name-cell">{{ lead.name }}</td>
              <td>{{ lead.company || '—' }}</td>
              <td><span class="stage-pill">{{ i18n.t('crm.stages.' + lead.stage) }}</span></td>
              <td>{{ lead.value | number }}&nbsp;€</td>
              <td>{{ i18n.list('crm.form.sources')[lead.sourceIndex] }}</td>
              <td>{{ lead.createdAt | date: 'mediumDate' }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" class="column-empty">{{ i18n.t('crm.list.empty') }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class LeadListComponent {
  @Input({ required: true }) leads: Lead[] = [];
  @Output() open = new EventEmitter<string>();

  i18n = inject(LanguageService);

  sortedLeads(): Lead[] {
    return [...this.leads].sort((a, b) => b.createdAt - a.createdAt);
  }
}
