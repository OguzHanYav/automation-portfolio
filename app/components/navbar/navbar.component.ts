import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <a routerLink="/" class="brand">
        <span class="brand-logo">OY</span>
        <span>
          <strong>Oguz Han Yavuz</strong>
          <small>{{ i18n.t('nav.brandTag') }}</small>
        </span>
      </a>

      <nav class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ i18n.t('nav.home') }}</a>
        <a routerLink="/projects" routerLinkActive="active">{{ i18n.t('nav.work') }}</a>
        <a routerLink="/crm" routerLinkActive="active">{{ i18n.t('nav.demo') }}</a>
        <a routerLink="/contact" routerLinkActive="active">{{ i18n.t('nav.contact') }}</a>
        <a href="https://oguzhan-yavuz.com" target="_blank" rel="noopener">{{ i18n.t('nav.devPortfolio') }}</a>
      </nav>

      <div class="lang-switch" role="group" aria-label="Language">
        @for (l of i18n.supported; track l) {
          <button
            type="button"
            [class.active]="i18n.lang() === l"
            [attr.aria-pressed]="i18n.lang() === l"
            (click)="i18n.setLang(l)"
          >{{ l.toUpperCase() }}</button>
        }
      </div>
    </header>
  `
})
export class NavbarComponent {
  i18n = inject(LanguageService);
}
