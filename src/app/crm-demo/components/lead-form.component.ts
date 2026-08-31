import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewLeadInput } from '../crm-demo.model';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="cancel.emit()">
      <div class="modal" (click)="$event.stopPropagation()">
        <h2>{{ i18n.t('crm.form.title') }}</h2>

        <form (ngSubmit)="submitForm()">
          <div class="modal-grid">
            <label>
              {{ i18n.t('crm.form.nameLabel') }}
              <input [(ngModel)]="name" name="name" required maxlength="80" [placeholder]="i18n.t('crm.form.namePlaceholder')">
            </label>

            <label>
              {{ i18n.t('crm.form.emailLabel') }}
              <input [(ngModel)]="email" name="email" required type="email" maxlength="120" [placeholder]="i18n.t('crm.form.emailPlaceholder')">
            </label>

            <label>
              {{ i18n.t('crm.form.phoneLabel') }}
              <input [(ngModel)]="phone" name="phone" maxlength="40" [placeholder]="i18n.t('crm.form.phonePlaceholder')">
            </label>

            <label>
              {{ i18n.t('crm.form.companyLabel') }}
              <input [(ngModel)]="company" name="company" maxlength="80" [placeholder]="i18n.t('crm.form.companyPlaceholder')">
            </label>

            <label>
              {{ i18n.t('crm.form.sourceLabel') }}
              <select [(ngModel)]="sourceIndex" name="source">
                @for (source of i18n.list('crm.form.sources'); track $index) {
                  <option [value]="$index">{{ source }}</option>
                }
              </select>
            </label>

            <label>
              {{ i18n.t('crm.form.valueLabel') }}
              <input [(ngModel)]="value" name="value" type="number" min="0" step="10" [placeholder]="i18n.t('crm.form.valuePlaceholder')">
            </label>
          </div>

          <label>
            {{ i18n.t('crm.form.noteLabel') }}
            <textarea [(ngModel)]="note" name="note" maxlength="400" [placeholder]="i18n.t('crm.form.notePlaceholder')"></textarea>
          </label>

          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" (click)="cancel.emit()">{{ i18n.t('crm.form.cancelBtn') }}</button>
            <button type="submit" class="btn btn-primary">{{ i18n.t('crm.form.submitBtn') }}</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LeadFormComponent {
  @Output() create = new EventEmitter<NewLeadInput>();
  @Output() cancel = new EventEmitter<void>();

  i18n = inject(LanguageService);

  name = '';
  email = '';
  phone = '';
  company = '';
  sourceIndex = 0;
  value: number | null = null;
  note = '';

  submitForm(): void {
    if (!this.name.trim() || !this.email.trim()) {
      return;
    }
    this.create.emit({
      name: this.name,
      email: this.email,
      phone: this.phone,
      company: this.company,
      sourceIndex: Number(this.sourceIndex),
      value: this.value ?? 0,
      note: this.note
    });
  }
}
