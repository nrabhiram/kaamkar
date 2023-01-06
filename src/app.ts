import { Controller } from './controller/controller';
import { Router } from './router';
import './styles.css';
import './assets/apple-touch-icon.png';
import './assets/favicon-16x16.png';
import './assets/favicon-32x32.png';
import './assets/site.webmanifest';
import './assets/twitter-card.png';

export const state = {
  projects: Controller.read(),
  projectId: 0,
  project: function () {
    for (let i = 0; i < this.projects.projects.length; i++) {
      if (this.projectId === this.projects.projects[i].id) {
        return this.projects.projects[i];
      }
    }
  }
};

new Router().route();
window.onpopstate = new Router().route;
