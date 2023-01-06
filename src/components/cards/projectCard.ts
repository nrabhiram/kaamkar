import { Router } from '../../router';
import { ProjectsListView } from '../../view/projectsListView';
import { Component } from '../component';
import { ProjectDropZone } from '../dropZones/projectDropZone';

export class ProjectCard extends Component<
  HTMLElement,
  Element,
  ProjectsListView
> {
  project: {
    title: string;
    description: string;
    date: string;
    progress: number;
    id: number;
  };
  dropZone: ProjectDropZone;

  constructor(
    hostElementId: string,
    view: ProjectsListView,
    project: {
      title: string;
      description: string;
      date: string;
      progress: number;
      id: number;
    }
  ) {
    super(hostElementId, view);
    this.project = project;
    this.templateString = this.projectHTML(project);
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
    this.dropZone = new ProjectDropZone(`project-${project.id}`, view, false);
  }

  private projectHTML(project: {
    title: string;
    description: string;
    date: string;
    progress: number;
    id: number;
  }) {
    const shouldBeTruncated = project.description.length >= 200;
    let truncatedDescription: string;
    let truncatedHTML: string;
    if (shouldBeTruncated) {
      truncatedDescription = `${project.description.substring(0, 200)}...`;
      truncatedHTML = `
        <p class="project-description collapsible full-project-description">${project.description}</p>
        <button class="read-btn group">
            <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span class="read-btn-text">Read more</span>
        </button>
      `;
    } else {
      truncatedDescription = project.description;
      truncatedHTML = '';
    }
    return `
      <div class="project-card-container" draggable="true" id="project-${project.id}">
        <div class="project-card draggable">
          <h5 class="project-title">${project.title}</h5>
          <div class="progress-bar-container">
            <div class="progress-bar-empty">
              <div class="progress-bar-full" style="width: ${project.progress}%;"></div>
            </div>
            <span class="progress-text">${project.progress}%</span>
          </div>
          <p class="project-description truncated-project-description">
            ${truncatedDescription}
          </p>
          ${truncatedHTML}
          <div class="project-card-footer">
            <p class="project-date-created">${project.date}</p>
            <div class="project-options">
              <button type="button" class="project-btn edit-project-btn project-option-spacing">
                <svg class="project-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </button>
              <button type="button" class="project-btn delete-project-btn">
                <svg class="project-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  configure() {
    const projectEditBtn = this.element.querySelector('.edit-project-btn');
    const projectDeleteBtn = this.element.querySelector('.delete-project-btn');
    const readBtn = this.element.querySelector('.read-btn');
    projectEditBtn?.addEventListener('click', this.editBtnClick.bind(this));
    projectDeleteBtn?.addEventListener('click', this.deleteBtnClick.bind(this));
    (this.element as HTMLElement).addEventListener(
      'dragstart',
      this.projectDragStart.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'dragend',
      this.projectDragEnd.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'click',
      this.cardLinkHandler.bind(this)
    );
    if (readBtn) {
      (readBtn as HTMLElement).addEventListener(
        'click',
        this.toggleDescription
      );
    }
  }

  edit(title: string, description: string) {
    const project = {
      title: title,
      description: description,
      date: this.project.date,
      progress: this.project.progress,
      id: this.project.id
    };
    this.templateString = this.projectHTML(project);
    const editedElement = this.createElement(this.templateString);
    this.element.replaceWith(editedElement);
    this.project = project;
    this.dropZone = new ProjectDropZone(
      `project-${project.id}`,
      this.view,
      false
    );
    this.element = editedElement;
    this.configure();
  }

  delete() {
    this.element.remove();
  }

  arrange(projectsContainerEle: Element, adjacentProjectEle?: Element) {
    if (adjacentProjectEle) {
      projectsContainerEle?.insertBefore(this.element, adjacentProjectEle);
    } else {
      projectsContainerEle?.insertAdjacentElement('beforeend', this.element);
    }
  }

  private toggleDescription(e: MouseEvent) {
    const projectElement = (e.target as HTMLElement).closest(
      '.project-card-container'
    ) as Element;
    const truncatedDescription = projectElement.querySelector(
      '.truncated-project-description'
    ) as Element;
    const fullDescription = projectElement.querySelector(
      '.full-project-description'
    ) as Element;
    const descriptionButton = projectElement.querySelector(
      '.read-btn'
    ) as Element;
    if (fullDescription.classList.contains('collapsible')) {
      truncatedDescription.classList.toggle('collapsible');
      fullDescription.classList.toggle('collapsible');
      fullDescription.classList.toggle('active');
      (fullDescription as HTMLElement).style.maxHeight =
        fullDescription.scrollHeight + 'px';
      descriptionButton.innerHTML = `
        <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
        <span class="read-btn-text">Read less</span>
      `;
    } else {
      (fullDescription as HTMLElement).style.maxHeight = '0px';
      descriptionButton.innerHTML = `
        <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <span class="read-btn-text">Read more</span>
      `;
      setTimeout(() => {
        truncatedDescription.classList.toggle('collapsible');
        fullDescription.classList.toggle('active');
        fullDescription.classList.toggle('collapsible');
      }, 200);
    }
  }

  private editBtnClick(e: Event) {
    const projectElement = (e.target as HTMLElement).closest(
      '.project-card-container'
    );
    if (projectElement) {
      this.view.editProjectFormBtnClicked(this, this.project);
    }
  }

  private deleteBtnClick(e: Event) {
    const projectElement = (e.target as HTMLElement).closest(
      '.project-card-container'
    );
    if (projectElement) {
      this.view.deleteProjectFormBtnClicked(this, this.project);
    }
  }

  private projectDragStart(e: DragEvent) {
    (e.dataTransfer as DataTransfer).setData(
      'text/plain',
      (e.target as HTMLElement).id
    );
    (e.dataTransfer as DataTransfer).effectAllowed = 'move';
    const projectCardEle = this.element.querySelector('.project-card');
    projectCardEle?.classList.add('dragging');
    this.view.projectDragged(this, this.project);
  }

  private projectDragEnd() {
    const projectCardEle = this.element.querySelector('.project-card');
    projectCardEle?.classList.remove('dragging');
  }

  private cardLinkHandler(e: MouseEvent) {
    const editBtn = (e.target as HTMLElement).matches(
      '.edit-project-btn, .edit-project-btn *'
    );
    const deleteBtn = (e.target as HTMLElement).matches(
      '.delete-project-btn, .delete-project-btn *'
    );
    const readBtn = (e.target as HTMLElement).matches('.read-btn, .read-btn *');
    if (!(editBtn || deleteBtn || readBtn)) {
      e.preventDefault();
      const cardEle = (e.target as HTMLElement).closest(
        '.project-card-container'
      ) as Element;
      const id = cardEle.id.split('-')[1];
      history.pushState(null, '', `projects/${id}`);
      new Router().route();
    }
  }
}
