import { ProjectsListView } from '../../view/projectsListView';
import { Modal } from './modal';

export class EditProjectForm extends Modal {
  templateString: string;

  constructor(view: ProjectsListView) {
    super(view);
    this.templateString = this.editProjectFormHTML();
    this.element = this.createElement(this.templateString);
    this.attach(true);
    this.configure();
  }

  private editProjectFormHTML() {
    return `
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="form-modal-bg hidden modal-bg-ease-out" id="edit-project-modal-background"></div>
        <div class="modal-container" id="edit-project-modal-container">
          <div class="form-container" id="edit-project-modal-overlay">
            <div class="form-border modal-ease-out" id="edit-project-modal">
              <div class="form-content">
                <h3 class="form-title">Edit your project</h3>
                <form>
                  <div class="input-container">
                    <label class="form-label" id="edit-project-title-label">Project name</label>
                    <input type="text" class="form-input" id="edit-project-title-input">
                    <p class="form-input-description">Name of your project</p>
                  </div>
                  <div class="input-container">
                    <label class="form-label">Project description</label>
                    <textarea rows="3" class="form-input" id="edit-project-description-input"></textarea>
                    <p class="form-input-description">Brief description of your project</p>
                  </div>
                  <button type="submit" class="add-btn" id="edit-project-form-submit-btn">Edit Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  configure() {
    const editProjectForm = this.element.querySelector('form') as HTMLElement;
    (this.element as HTMLElement).addEventListener(
      'click',
      this.fadeOut.bind(this)
    );
    editProjectForm.addEventListener('submit', this.onEdit.bind(this));
  }

  fadeIn(title: string, description: string) {
    const editTitleInput = document.getElementById('edit-project-title-input');
    const editDescriptionInput = document.getElementById(
      'edit-project-description-input'
    );
    if (editTitleInput) {
      (editTitleInput as HTMLInputElement).value = title;
    }
    if (editDescriptionInput) {
      (editDescriptionInput as HTMLTextAreaElement).value = description;
    }
    this.renderModal(
      'edit-project-modal',
      'edit-project-modal-background',
      'edit-project-modal-container'
    );
  }

  private fadeOut(e: MouseEvent) {
    const modalOverlay = (e.target as HTMLElement).matches(
      '#edit-project-modal-overlay'
    );
    if (modalOverlay) {
      (this.view as ProjectsListView).editProjectFormClosed();
      this.removeModal(
        'edit-project-modal',
        'edit-project-modal-background',
        'edit-project-modal-container'
      );
    }
  }

  private onEdit(e: SubmitEvent) {
    e.preventDefault();
    const projectTitle = (
      document.getElementById('edit-project-title-input') as HTMLInputElement
    ).value;
    const projectDescription = (
      document.getElementById(
        'edit-project-description-input'
      ) as HTMLTextAreaElement
    ).value;
    (this.view as ProjectsListView).editProjectBtnClicked(
      projectTitle,
      projectDescription
    );
    this.removeModal(
      'edit-project-modal',
      'edit-project-modal-background',
      'edit-project-modal-container'
    );
  }
}
