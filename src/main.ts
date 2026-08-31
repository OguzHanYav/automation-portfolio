import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ProjectsComponent } from './app/pages/projects/projects.component';
import { ProjectDetailComponent } from './app/pages/project-detail/project-detail.component';
import { CrmComponent } from './app/pages/crm/crm.component';
import { ContactComponent } from './app/pages/contact/contact.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:slug', component: ProjectDetailComponent },
  { path: 'demo', component: CrmComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))
  ]
}).catch((error) => console.error(error));
