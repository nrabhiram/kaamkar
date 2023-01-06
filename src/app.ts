import { Controller } from './controller/controller';
import { Router } from './router';
import './styles.css';
import './assets/apple-touch-icon.png';
import './assets/favicon-16x16.png';
import './assets/favicon-32x32.png';
import './assets/site.webmanifest';
import './assets/twitter-card.png';
import { ProjectsList } from './model/projectsList';
import { Project } from './model/project';

export const state: {
  projects: ProjectsList;
  projectId: number;
  project: Project | undefined;
} = {
  projects: Controller.read(),
  projectId: 0,
  project: undefined
};

new Router().route();
window.onpopstate = new Router().route;
