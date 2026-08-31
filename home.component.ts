import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { automationProjects } from '../../data/projects';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent],
  template: `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">{{ i18n.t('home.eyebrow') }}</p>
        <h1>{{ i18n.t('home.title') }}</h1>
        <p class="hero-text">{{ i18n.t('home.text') }}</p>

        <div class="hero-actions">
          <a routerLink="/projects" class="btn btn-primary">{{ i18n.t('home.exploreBtn') }}</a>
          <a routerLink="/contact" class="btn btn-ghost">{{ i18n.t('home.startBtn') }}</a>
        </div>
      </div>

      <aside class="system-card">
        <div class="system-card-top">
          <span></span><span></span><span></span>
        </div>
        <p class="mini-label">{{ i18n.t('home.liveConceptLabel') }}</p>
        <h2>{{ i18n.t('home.pipelineTitle') }}</h2>

        <div class="pipeline">
          @for (step of i18n.list('home.pipelineSteps'); track $index) {
            <div><b>{{ ('0' + ($index + 1)) }}</b><span>{{ step }}</span></div>
          }
        </div>
      </aside>
    </section>

    <section class="metrics">
      @for (metric of metricValues; track $index) {
        <div>
          <strong>{{ metric }}</strong>
          <span>{{ i18n.list('home.metrics')[$index] }}</span>
        </div>
      }
    </section>

    <section class="section">
      <div class="section-head">
        <p class="eyebrow">{{ i18n.t('home.approachEyebrow') }}</p>
        <h2>{{ i18n.t('home.approachTitle') }}</h2>
      </div>

      <div class="feature-grid">
        @for (feature of i18n.list('home.features'); track $index) {
          <article>
            <span>{{ ('0' + ($index + 1)) }}</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </article>
        }
      </div>
    </section>

    <section class="section">
      <div class="section-head split">
        <div>
          <p class="eyebrow">{{ i18n.t('home.selectedWorkEyebrow') }}</p>
          <h2>{{ i18n.t('home.selectedWorkTitle') }}</h2>
        </div>
        <a routerLink="/projects" class="text-link">{{ i18n.t('home.viewAll') }}</a>
      </div>

      <div class="project-grid">
        @for (project of projects; track project.slug) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>

    <section class="cta">
      <p class="eyebrow">{{ i18n.t('home.ctaEyebrow') }}</p>
      <h2>{{ i18n.t('home.ctaTitle') }}</h2>
      <a routerLink="/contact" class="btn btn-primary">{{ i18n.t('home.ctaBtn') }}</a>
    </section>
  `
})
export class HomeComponent {
  i18n = inject(LanguageService);
  private titleService = inject(Title);

  projects = automationProjects;
  metricValues = ['3+', '0', '100%'];

  constructor() {
    // Bug fix: the browser tab title never reflected the page or the
    // selected language. This keeps it in sync whenever the language changes.
    effect(() => {
      this.titleService.setTitle(`${this.i18n.t('home.pageTitle')} | Oguz Han Yavuz`);
    });
  }
}
