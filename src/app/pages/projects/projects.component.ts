import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { automationProjects } from '../../data/projects';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <section class="page-hero">
      <p class="eyebrow">{{ i18n.t('projects.eyebrow') }}</p>
      <h1>{{ i18n.t('projects.title') }}</h1>
      <p>{{ i18n.t('projects.text') }}</p>
    </section>

    <section class="project-grid page-grid">
      @for (project of projects; track project.slug) {
        <app-project-card [project]="project" />
      }
    </section>
  `
})
export class ProjectsComponent {
  i18n = inject(LanguageService);
  private titleService = inject(Title);

  projects = automationProjects;

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.i18n.t('projects.pageTitle')} | Oguz Han Yavuz`);
    });
  }
}
