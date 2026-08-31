import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Lead } from '../../supabase/supabase.types';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="lead-list-wrap">
      <table class="lead-list-table">
        <thead>
          <tr>
            <th>{{ i18n.t('crm.list.name') }}</th>
            <th>{{ i18n.t('crm.list.email') }}</th>
            <th>{{ i18n.t('crm.list.phone') }}</th>
            <th>{{ i18n.t('crm.list.stage') }}</th>
            <th>{{ i18n.t('crm.list.created') }}</th>
          </tr>
        </thead>
        <tbody>
          @for (lead of leads; track lead.id) {
            <tr (click)="open.emit(lead.id)">
              <td class="lead-name-cell">{{ lead.name }}</td>
              <td>{{ lead.email }}</td>
              <td>{{ lead.phone || '—' }}</td>
              <td><span class="stage-pill">{{ i18n.t('crm.stages.' + lead.status) }}</span></td>
              <td>{{ lead.created_at | date: 'medium' }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="column-empty">{{ i18n.t('crm.list.empty') }}</td>
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
}
