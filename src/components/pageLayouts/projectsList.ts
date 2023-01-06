import { ProjectsListView } from '../../view/projectsListView';
import { Component } from '../component';
import { ProjectDropZone } from '../dropZones/projectDropZone';

export class ProjectsList extends Component<
  HTMLElement,
  Element,
  ProjectsListView
> {
  constructor(view: ProjectsListView) {
    super('app', view);
    this.templateString = this.projectsListHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
    new ProjectDropZone('projects-container', view, false);
  }

  private projectsListHTML() {
    return `
      <div class="app-body">
        <div class="app-head">
          <div class="page-title">
            <h1 class="page-heading">
              Projects
            </h1>
            <p class="page-description">
              Create a project and organize your tasks with ease.
            </p>
          </div>
          <button type="button" class="add-btn" id="add-project-btn">
            <svg class="add-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create a New Project
          </button>
        </div>
        <div class="project-container" id="projects-container"></div>
      </div>
    `;
  }

  configure() {
    const addBtn = this.element.querySelector(
      '#add-project-btn'
    ) as HTMLElement;
    addBtn.addEventListener('click', this.onAddBtnClicked.bind(this));
  }

  private onAddBtnClicked() {
    this.view.addProjectFormBtnClicked();
  }
}
