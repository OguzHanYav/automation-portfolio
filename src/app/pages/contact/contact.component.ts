import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="contact-page">
      <div>
        <p class="eyebrow">{{ i18n.t('contact.eyebrow') }}</p>
        <h1>{{ i18n.t('contact.title') }}</h1>
        <p>{{ i18n.t('contact.text') }}</p>

        <div class="contact-note">
          <span>{{ i18n.t('contact.emailLabel') }}</span>
          <a href="mailto:office&#64;oguzhan-yavuz.com">office&#64;oguzhan-yavuz.com</a>
        </div>
      </div>

      <form class="contact-form" (ngSubmit)="submit()">
        <label>
          {{ i18n.t('contact.nameLabel') }}
          <input [(ngModel)]="name" name="name" required maxlength="80" [placeholder]="i18n.t('contact.namePlaceholder')">
        </label>

        <label>
          {{ i18n.t('contact.emailFieldLabel') }}
          <input [(ngModel)]="email" name="email" required type="email" maxlength="120" [placeholder]="i18n.t('contact.emailPlaceholder')">
        </label>

        <label>
          {{ i18n.t('contact.messageLabel') }}
          <textarea [(ngModel)]="message" name="message" required maxlength="1000" [placeholder]="i18n.t('contact.messagePlaceholder')"></textarea>
        </label>

        <label class="consent">
          <input [(ngModel)]="consent" name="consent" type="checkbox" required>
          <span>{{ i18n.t('contact.consentLabel') }}</span>
        </label>

        <button class="btn btn-primary" type="submit">{{ i18n.t('contact.submitBtn') }}</button>

        @if (notice) {
          <p class="notice">{{ notice }}</p>
        }
      </form>
    </section>
  `
})
export class ContactComponent {
  i18n = inject(LanguageService);
  private titleService = inject(Title);

  name = '';
  email = '';
  message = '';
  consent = false;
  notice = '';

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.i18n.t('contact.pageTitle')} | Oguz Han Yavuz`);
    });
  }

  submit(): void {
    // Bug fix: previously only the consent checkbox was checked here, so an
    // empty name/email/message could still trigger a mailto link on browsers
    // that don't enforce the `required` attribute on submit.
    if (!this.name.trim() || !this.email.trim() || !this.message.trim() || !this.consent) {
      this.notice = this.i18n.t('contact.noticeConsent');
      return;
    }

    const subject = encodeURIComponent(`${this.i18n.t('home.pageTitle')} — ${this.name}`);
    const body = encodeURIComponent(
      `${this.i18n.t('contact.nameLabel')}: ${this.name}\n${this.i18n.t('contact.emailFieldLabel')}: ${this.email}\n\n${this.i18n.t('contact.messageLabel')}:\n${this.message}`
    );
    window.location.href = `mailto:office@oguzhan-yavuz.com?subject=${subject}&body=${body}`;
    this.notice = this.i18n.t('contact.noticeSuccess');
  }
}
