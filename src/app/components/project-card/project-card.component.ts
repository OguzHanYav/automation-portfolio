import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutomationProject } from '../../data/projects';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="project-card" [routerLink]="['/projects', project.slug]">
      <div class="project-meta">
        <span>{{ project.category[i18n.lang()] }}</span>
        <span>{{ i18n.t('projectCard.caseStudy') }}</span>
      </div>

      <h3>{{ project.title[i18n.lang()] }}</h3>
      <p>{{ project.summary[i18n.lang()] }}</p>

      <div class="project-tools">
        @for (tool of project.tools.slice(0, 3); track $index) {
          <small>{{ tool }}</small>
        }
      </div>

      <div class="project-link">{{ i18n.t('projectCard.viewSystem') }}</div>
    </a>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: AutomationProject;
  i18n = inject(LanguageService);
}
