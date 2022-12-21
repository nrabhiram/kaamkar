import { PageView } from './pageView';

export class ProjectsListView extends PageView {
  private addProjectForm: string;
  private editProjectForm: string;
  private deleteProjectModal: string;

  private static addedHandlers = false;
  private static selectedProjectTitle = '';
  private static selectedProjectDescription = '';
  private static selectedProjectId = 0;
  private static months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor() {
    super();
    this.addProjectForm = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="form-modal-bg hidden modal-bg-ease-out" id="add-project-modal-background"></div>
            <div class="modal-container" id="add-project-modal-container">
                <div class="form-container" id="add-project-modal-overlay">
                    <div class="form-border modal-ease-out" id="add-project-modal">
                        <div class="form-content">
                            <h3 class="form-title">Create a new project</h3>
                            <form action="#" method="POST">
                                <div class="my-2">
                                    <label for="first-name" class="form-label" id="add-project-title-label">Project name</label>
                                    <input type="text" name="first-name" class="form-input" id="add-project-title-input">
                                    <p class="form-input-description">Name of your project</p>
                                </div>
                                <div class="my-2">
                                    <label for="about" class="form-label">Project description</label>
                                    <textarea name="about" rows="3" class="form-input" id="add-project-description-input"></textarea>
                                    <p class="form-input-description">Brief description of your project</p>
                                </div>
                            </form>
                            <button type="submit" class="add-btn" id="add-project-form-submit-btn">Create Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.editProjectForm = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="form-modal-bg hidden modal-bg-ease-out" id="edit-project-modal-background"></div>
            <div class="modal-container" id="edit-project-modal-container">
                <div class="form-container" id="edit-project-modal-overlay">
                    <div class="form-border modal-ease-out" id="edit-project-modal">
                        <div class="form-content">
                            <h3 class="form-title">Edit your project</h3>
                            <form action="#" method="POST">
                                <div class="my-2">
                                    <label for="first-name" class="form-label" id="edit-project-title-label">Project name</label>
                                    <input type="text" name="first-name" class="form-input" id="edit-project-title-input">
                                    <p class="form-input-description">Name of your project</p>
                                </div>
                                <div class="my-2">
                                    <label for="about" class="form-label">Project description</label>
                                    <textarea name="about" rows="3" class="form-input" id="edit-project-description-input"></textarea>
                                    <p class="form-input-description">Brief description of your project</p>
                                </div>
                            </form>
                            <button type="submit" class="add-btn" id="edit-project-form-submit-btn">Edit Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.deleteProjectModal = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="msg-modal-bg hidden modal-bg-ease-out" id="delete-project-modal-background"></div>
            <div class="modal-container" id="delete-project-modal-container">
                <div class="msg-container" id="delete-project-modal-overlay">
                    <div class="msg-border modal-ease-out" id="delete-project-modal">
                        <div class="msg-content">
                            <div class="msg-text-content-container">
                                <div class="msg-icon-container">
                                    <svg class="msg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div class="msg-text">
                                    <h3 class="msg-title">Delete project</h3>
                                    <div class="mt-2">
                                    <p class="msg-description">Are you sure you want to delete this project? It will be permanently removed and the action cannot be undone.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="msg-btn-container">
                            <button type="button" class="msg-delete-btn" id="delete-project-modal-delete-btn">Delete</button>
                            <button type="button" class="msg-cancel-btn" id="delete-project-modal-cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.init();
  }

  private init() {
    if (!ProjectsListView.addedHandlers) {
      document.addEventListener('click', (e: any) => {
        const addProjectButton = e.target.matches(
          '#add-project-btn, #add-project-btn *'
        );
        const editProjectButton = e.target.matches(
          '.edit-project-btn, .edit-project-btn *'
        );
        const deleteProjectButton = e.target.matches(
          '.delete-project-btn, .delete-project-btn *'
        );
        if (editProjectButton || deleteProjectButton) {
          const projectElement = e.target.closest('.project-card');
          let projectDescriptionElement;
          if (projectElement.querySelector('.full-project-description')) {
            projectDescriptionElement = projectElement.querySelector(
              '.full-project-description'
            );
          } else if (
            projectElement.querySelector('.truncated-project-description')
          ) {
            projectDescriptionElement = projectElement.querySelector(
              '.truncated-project-description'
            );
          }
          const projectTitle =
            projectElement.querySelector('.project-title').innerText;
          const projectDescription = projectDescriptionElement.innerText;
          ProjectsListView.selectedProjectId = +projectElement.id.split('-')[1];
          ProjectsListView.selectedProjectTitle = projectTitle;
          ProjectsListView.selectedProjectDescription = projectDescription;
        }
        if (addProjectButton) {
          this.renderAddProjectForm();
        } else if (editProjectButton) {
          this.renderEditProjectForm(
            ProjectsListView.selectedProjectTitle,
            ProjectsListView.selectedProjectDescription
          );
        } else if (deleteProjectButton) {
          this.renderDeleteProjectModal();
        }
      });
      document.addEventListener('click', (e: any) => {
        const addProjectForm = e.target.matches('#add-project-modal-overlay');
        const editProjectForm = e.target.matches('#edit-project-modal-overlay');
        const deleteProjectForm = e.target.matches(
          '#delete-project-modal-overlay'
        );
        const cancelDeleteProjectButton = e.target.matches(
          '#delete-project-modal-cancel-btn'
        );
        if (addProjectForm) {
          this.removeAddProjectForm();
        } else if (editProjectForm) {
          this.removeEditProjectForm();
        } else if (deleteProjectForm || cancelDeleteProjectButton) {
          this.removeDeleteProjectModal();
        }
      });
      document.addEventListener('click', (e: any) => {
        const readButton = e.target.matches('.read-btn, .read-btn *');
        if (readButton) {
          const projectElement = e.target.closest('.project-card');
          this.toggleDescription(
            projectElement,
            '.truncated-project-description',
            '.full-project-description'
          );
        }
      });
      ProjectsListView.addedHandlers = true;
    }
  }

  private projects(
    projects: {
      title: string;
      description: string;
      date: string;
      progress: number;
      id: number;
    }[]
  ) {
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
            <div class="project-container">
                ${projects.map(this.renderProject.bind(this))}
            </div>
        </div>
        `;
  }

  private truncateDescription(description: string) {
    const shouldBeTruncated = description.length >= 200;
    let truncatedHTML: string;
    if (shouldBeTruncated) {
      const truncatedDescription = `${description.substring(0, 200)}...`;
      truncatedHTML = `
            <div class="project-card-description">
                <p class="project-description truncated-project-description">
                    ${truncatedDescription}
                </p>
                <p class="project-description collapsible full-project-description">${description}</p>
                <button class="read-btn group">
                    <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    <span class="read-btn-text">Read more</span>
                </button>
            </div>
            `;
    } else {
      truncatedHTML = `
            <div class="project-card-description">
                <p class="project-description truncated-project-description">
                    ${description}
                </p>
            </div>
            `;
    }
    return truncatedHTML;
  }

  private renderProject(project: {
    title: string;
    description: string;
    date: string;
    progress: number;
    id: number;
  }) {
    return `
        <div class="project-card" id="project-${project.id}">
            <h5 class="project-title">${project.title}</h5>
            <div class="progress-bar-container">
                <div class="progress-bar-empty">
                    <div class="progress-bar-full" style="width: ${
                      project.progress
                    }%;"></div>
                </div>
                <span class="progress-text">${project.progress}%</span>
            </div>
            ${this.truncateDescription(project.description)}
            <div class="project-card-footer">
                <p class="project-date-created">${project.date}</p>
                <div class="project-options">
                    <button type="button" class="project-btn edit-project-btn mr-2">
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
        `;
  }

  private renderAddProjectForm() {
    this.renderModal(
      this.addProjectForm,
      'add-project-modal-background',
      'add-project-modal-container',
      'add-project-modal'
    );
  }

  private renderEditProjectForm(title: string, description: string) {
    this.renderModal(
      this.editProjectForm,
      'edit-project-modal-background',
      'edit-project-modal-container',
      'edit-project-modal'
    );
    this.editFormDefaultInputs(
      title,
      description,
      'edit-project-title-input',
      'edit-project-description-input'
    );
  }

  private renderDeleteProjectModal() {
    this.renderModal(
      this.deleteProjectModal,
      'delete-project-modal-background',
      'delete-project-modal-container',
      'delete-project-modal'
    );
  }

  private removeAddProjectForm() {
    this.removeModal(
      'add-project-modal-background',
      'add-project-modal-container',
      'add-project-modal'
    );
  }

  private removeEditProjectForm() {
    this.removeModal(
      'edit-project-modal-background',
      'edit-project-modal-container',
      'edit-project-modal'
    );
  }

  private removeDeleteProjectModal() {
    this.removeModal(
      'delete-project-modal-background',
      'delete-project-modal-container',
      'delete-project-modal'
    );
  }

  render(
    projects: {
      title: string;
      description: string;
      date: string;
      progress: number;
      id: number;
    }[]
  ) {
    const app = document.querySelector('.app');
    if (app) {
      app.innerHTML = '';
      app.innerHTML = `
                ${this.bg}
                ${this.nav}
                ${this.projects(projects)}
                ${this.grow}
                ${this.footer}
            `;
    }
  }

  add(project: {
    title: string;
    description: string;
    date: string;
    progress: number;
    id: number;
  }) {
    const projectHTML = this.renderProject(project);
    const projectsContainer = document.querySelector('.project-container');
    projectsContainer?.insertAdjacentHTML('beforeend', projectHTML);
    this.removeAddProjectForm();
  }

  edit() {
    const projectHTML = document.getElementById(
      `project-${ProjectsListView.selectedProjectId}`
    );
    const projectTitleElement = projectHTML?.querySelector('.project-title');
    const projectDescriptionElement = projectHTML?.querySelector(
      '.project-card-description'
    );
    const projectTitle = this.editTitleInput();
    const projectDescription = this.editDescriptionInput();
    projectDescriptionElement?.insertAdjacentHTML(
      'beforebegin',
      this.truncateDescription(projectDescription)
    );
    if (projectTitleElement) {
      (projectTitleElement as HTMLElement).innerText = projectTitle;
    }
    projectDescriptionElement?.remove();
    this.removeEditProjectForm();
  }

  delete() {
    document
      .getElementById(`project-${ProjectsListView.selectedProjectId}`)
      ?.remove();
    this.removeDeleteProjectModal();
  }

  addTitleInput() {
    return this.titleInput('add-project-title-input');
  }

  editTitleInput() {
    return this.titleInput('edit-project-title-input');
  }

  addDescriptionInput() {
    return this.descriptionInput('add-project-description-input');
  }

  editDescriptionInput() {
    return this.descriptionInput('edit-project-description-input');
  }

  selectedProject() {
    return {
      title: ProjectsListView.selectedProjectTitle,
      description: ProjectsListView.selectedProjectDescription,
      id: ProjectsListView.selectedProjectId
    };
  }
}
