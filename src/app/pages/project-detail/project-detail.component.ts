import { Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AutomationProject, getProjectBySlug } from '../../data/projects';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (project) {
      <section class="case-header">
        <a routerLink="/projects" class="text-link">{{ i18n.t('projectDetail.back') }}</a>
        <p class="eyebrow">{{ project.category[i18n.lang()] }}</p>
        <h1>{{ project.title[i18n.lang()] }}</h1>
        <p>{{ project.summary[i18n.lang()] }}</p>

        <div class="tags">
          @for (tool of project.tools; track $index) {
            <span>{{ tool }}</span>
          }
        </div>
      </section>

      <section class="case-summary">
        <article>
          <span>{{ i18n.t('projectDetail.problem') }}</span>
          <p>{{ project.problem[i18n.lang()] }}</p>
        </article>
        <article>
          <span>{{ i18n.t('projectDetail.solution') }}</span>
          <p>{{ project.solution[i18n.lang()] }}</p>
        </article>
        <article>
          <span>{{ i18n.t('projectDetail.result') }}</span>
          <p>{{ project.result[i18n.lang()] }}</p>
        </article>
      </section>

      <section class="case-detail-grid">
        <article class="detail-panel">
          <h2>{{ i18n.t('projectDetail.workflowTitle') }}</h2>
          <ol>
            @for (step of project.workflow[i18n.lang()]; track $index) {
              <li>{{ step }}</li>
            }
          </ol>
        </article>

        <article class="detail-panel">
          <h2>{{ i18n.t('projectDetail.featuresTitle') }}</h2>
          <ul>
            @for (feature of project.features[i18n.lang()]; track $index) {
              <li>{{ feature }}</li>
            }
          </ul>
        </article>

        <article class="detail-panel wide">
          <h2>{{ i18n.t('projectDetail.valueTitle') }}</h2>
          <div class="value-list">
            @for (value of project.businessValue[i18n.lang()]; track $index) {
              <span>{{ value }}</span>
            }
          </div>
        </article>
      </section>

      <section class="cta">
        <p class="eyebrow">{{ i18n.t('projectDetail.ctaEyebrow') }}</p>
        <h2>{{ i18n.t('projectDetail.ctaTitle') }}</h2>
        <a routerLink="/contact" class="btn btn-primary">{{ i18n.t('projectDetail.ctaBtn') }}</a>
      </section>
    } @else {
      <section class="page-hero">
        <h1>{{ i18n.t('projectDetail.notFoundTitle') }}</h1>
        <a routerLink="/projects" class="btn btn-primary">{{ i18n.t('projectDetail.notFoundBtn') }}</a>
      </section>
    }
  `
})
export class ProjectDetailComponent {
  i18n = inject(LanguageService);
  private titleService = inject(Title);
  private route = inject(ActivatedRoute);

  project?: AutomationProject;

  constructor() {
    // Bug fix: the original code read `route.snapshot.paramMap` once in the
    // constructor. Angular reuses this component when navigating between two
    // "/projects/:slug" routes (e.g. clicking a related project link), so the
    // constructor never re-ran and the page silently kept showing the old
    // project. Subscribing to `paramMap` instead reacts to every slug change.
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.project = getProjectBySlug(params.get('slug') ?? '');
    });

    effect(() => {
      const title = this.project ? this.project.title[this.i18n.lang()] : this.i18n.t('projectDetail.notFoundTitle');
      this.titleService.setTitle(`${title} | Oguz Han Yavuz`);
    });
  }
}
