import { ProjectsListView } from '../../view/projectsListView';
import { Modal } from './modal';

export class DeleteProjectModal extends Modal {
  templateString: string;

  constructor(view: ProjectsListView) {
    super(view);
    this.templateString = this.deleteProjectModalHTML();
    this.element = this.createElement(this.templateString);
    this.attach(true);
    this.configure();
  }

  private deleteProjectModalHTML() {
    return `
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
  }

  configure() {
    const deleteBtn = this.element.querySelector(
      '#delete-project-modal-delete-btn'
    );
    (this.element as HTMLElement).addEventListener(
      'click',
      this.fadeOut.bind(this)
    );
    deleteBtn?.addEventListener('click', this.onCallToActionClicked.bind(this));
  }

  fadeIn() {
    this.renderModal(
      'delete-project-modal',
      'delete-project-modal-background',
      'delete-project-modal-container'
    );
  }

  private fadeOut(e: MouseEvent) {
    const cancelBtn = (e.target as HTMLElement).matches(
      '#delete-project-modal-cancel-btn, #delete-project-modal-cancel-btn *'
    );
    const modalOverlay = (e.target as HTMLElement).matches(
      '#delete-project-modal-overlay'
    );
    (this.view as ProjectsListView).deleteProjectModalClosed();
    if (cancelBtn || modalOverlay) {
      this.removeModal(
        'delete-project-modal',
        'delete-project-modal-background',
        'delete-project-modal-container'
      );
    }
  }

  private onCallToActionClicked() {
    (this.view as ProjectsListView).deleteProjectBtnClicked();
    this.removeModal(
      'delete-project-modal',
      'delete-project-modal-background',
      'delete-project-modal-container'
    );
  }
}
