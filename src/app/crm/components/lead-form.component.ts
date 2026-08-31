import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeadsService, NewLeadInput } from '../leads.service';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="cancel.emit()">
      <div class="modal" (click)="$event.stopPropagation()">
        <h2>{{ i18n.t('crm.form.title') }}</h2>

        <form (ngSubmit)="submit()">
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
            <input
              [(ngModel)]="phone"
              name="phone"
              type="tel"
              maxlength="20"
              placeholder="+491511234567"
              pattern="^\\+[1-9]\\d{6,14}$"
              [title]="i18n.t('crm.form.phoneHint')"
            >
          </label>

          <label>
            {{ i18n.t('crm.form.notesLabel') }}
            <textarea [(ngModel)]="notes" name="notes" maxlength="500" [placeholder]="i18n.t('crm.form.notesPlaceholder')"></textarea>
          </label>

          @if (errorMessage()) {
            <p class="notice notice-error">{{ errorMessage() }}</p>
          }

          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" (click)="cancel.emit()">{{ i18n.t('crm.form.cancelBtn') }}</button>
            <button type="submit" class="btn btn-primary" [disabled]="submitting()">
              {{ submitting() ? i18n.t('crm.form.submitting') : i18n.t('crm.form.submitBtn') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LeadFormComponent {
  @Output() created = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private leadsService = inject(LeadsService);
  i18n = inject(LanguageService);

  name = '';
  email = '';
  phone = '';
  notes = '';

  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  async submit(): Promise<void> {
    if (!this.name.trim() || !this.email.trim()) {
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const input: NewLeadInput = { name: this.name, email: this.email, phone: this.phone, notes: this.notes };
    const { error } = await this.leadsService.createLead(input);

    this.submitting.set(false);

    if (error) {
      this.errorMessage.set(this.i18n.t('crm.form.errorSaving'));
      return;
    }

    // Der Supabase Database Webhook (→ Edge Function) läuft serverseitig
    // unabhängig von diesem Request — E-Mail/WhatsApp sind bereits
    // angestoßen, sobald der Insert committed ist.
    this.created.emit();
  }
}
