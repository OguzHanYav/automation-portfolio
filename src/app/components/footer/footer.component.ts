import { Component, inject } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div>
        <strong>Oguz Han Yavuz</strong>
        <p>{{ i18n.t('footer.role') }}</p>
      </div>
      <div>
        <p>{{ i18n.t('footer.note') }}</p>
        <p>{{ i18n.t('footer.rights') }}</p>
      </div>
    </footer>
  `
})
export class FooterComponent {
  i18n = inject(LanguageService);
}
