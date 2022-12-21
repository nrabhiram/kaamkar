import { ProjectController } from './controller/projectController';
import { Controller } from './controller/controller';
import { ProjectsListController } from './controller/projectsListController';
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

window.addEventListener('click', (e: any) => {
  const addProjectBtn = e.target.matches('#add-project-form-submit-btn');
  const editProjectBtn = e.target.matches('#edit-project-form-submit-btn');
  const deleteProjectBtn = e.target.matches('#delete-project-modal-delete-btn');
  const addItemBtn = e.target.matches('#add-item-form-submit-btn');
  const editItemBtn = e.target.matches('#edit-item-form-submit-btn');
  const deleteItemBtn = e.target.matches('#delete-item-modal-delete-btn');
  if (addProjectBtn) {
    new ProjectsListController(state.projects).add();
  } else if (editProjectBtn) {
    new ProjectsListController(state.projects).edit();
  } else if (deleteProjectBtn) {
    new ProjectsListController(state.projects).delete();
  } else if (addItemBtn) {
    const project = state.project();
    if (project) {
      new ProjectController(project).add();
    }
  } else if (editItemBtn) {
    const project = state.project();
    if (project) {
      new ProjectController(project).edit();
    }
  } else if (deleteItemBtn) {
    const project = state.project();
    if (project) {
      new ProjectController(project).delete();
    }
  }
});

document.addEventListener('click', (e: any) => {
  const navLink = e.target.matches('.internal-nav-link, .internal-nav-link *');
  if (navLink) {
    e.preventDefault();
    const link = e.target.closest('.internal-nav-link');
    history.pushState(null, '', link.href);
    new Router().route();
  }
});

document.addEventListener('click', (e: any) => {
  const projectCard = e.target.matches('.project-card, .project-card *');
  const deleteProjectBtn = e.target.matches(
    '.delete-project-btn, .delete-project-btn *'
  );
  const editProjectBtn = e.target.matches(
    '.edit-project-btn, .edit-project-btn *'
  );
  if (projectCard) {
    if (!deleteProjectBtn && !editProjectBtn) {
      const projectCardElement = e.target.closest('.project-card');
      const projectId = projectCardElement.id.split('-')[1];
      history.pushState(null, '', `/projects/${projectId}`);
      new Router().route();
    }
  }
});

document.addEventListener('click', (e: any) => {
  const heroAddProjectBtn = e.target.matches(
    '.hero-projects-link, .hero-projects-link *'
  );
  if (heroAddProjectBtn) {
    history.pushState(null, '', `/projects`);
    new Router().route();
  }
});
