import { ProjectsListView } from '../../view/projectsListView';
import { Modal } from './modal';

export class AddProjectForm extends Modal {
  templateString: string;

  constructor(view: ProjectsListView) {
    super(view);
    this.templateString = this.addProjectFormHTML();
    this.element = this.createElement(this.templateString);
    this.attach(true);
    this.configure();
  }

  private addProjectFormHTML() {
    return `
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="form-modal-bg hidden modal-bg-ease-out" id="add-project-modal-background"></div>
        <div class="modal-container" id="add-project-modal-container">
          <div class="form-container" id="add-project-modal-overlay">
            <div class="form-border modal-ease-out" id="add-project-modal">
              <div class="form-content">
                <h3 class="form-title">Create a new project</h3>
                <form>
                  <div class="input-container">
                    <label class="form-label" id="add-project-title-label">Project name</label>
                    <input type="text" class="form-input" id="add-project-title-input">
                    <p class="form-input-description">Name of your project</p>
                  </div>
                  <div class="input-container">
                    <label class="form-label">Project description</label>
                    <textarea rows="3" class="form-input" id="add-project-description-input"></textarea>
                    <p class="form-input-description">Brief description of your project</p>
                  </div>
                  <button type="submit" class="add-btn" id="add-project-form-submit-btn">Create Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  configure() {
    const addProjectForm = this.element.querySelector('form') as HTMLElement;
    (this.element as HTMLElement).addEventListener(
      'click',
      this.fadeOut.bind(this)
    );
    addProjectForm.addEventListener('submit', this.onSubmit.bind(this));
  }

  fadeIn() {
    this.renderModal(
      'add-project-modal',
      'add-project-modal-background',
      'add-project-modal-container'
    );
  }

  private fadeOut(e: MouseEvent) {
    const modalOverlay = (e.target as HTMLElement).matches(
      '#add-project-modal-overlay'
    );
    if (modalOverlay) {
      (this.view as ProjectsListView).addProjectFormClosed();
      this.removeModal(
        'add-project-modal',
        'add-project-modal-background',
        'add-project-modal-container'
      );
    }
  }

  private onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const projectTitle = (
      document.getElementById('add-project-title-input') as HTMLInputElement
    ).value;
    const projectDescription = (
      document.getElementById(
        'add-project-description-input'
      ) as HTMLInputElement
    ).value;
    (this.view as ProjectsListView).addProjectBtnClicked(
      projectTitle,
      projectDescription
    );
    this.removeModal(
      'add-project-modal',
      'add-project-modal-background',
      'add-project-modal-container'
    );
  }
}
