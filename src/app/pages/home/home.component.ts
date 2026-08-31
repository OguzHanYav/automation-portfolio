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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  i18n = inject(LanguageService);
  private titleService = inject(Title);

  projects = automationProjects;
  metricValues = ['3+', '0', '100%'];

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.i18n.t('home.pageTitle')} | Oguz Han Yavuz`);
    });
  }
}
