import { Controller } from './controller/controller';
import { Router } from './router';
import './styles.css';

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
