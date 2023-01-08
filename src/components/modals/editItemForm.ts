import { Category } from '../../model/status';
import { ProjectView } from '../../view/projectView';
import { Modal } from './modal';

export class EditItemForm extends Modal {
  templateString: string;

  constructor(view: ProjectView) {
    super(view);
    this.templateString = this.editItemFormHTML();
    this.element = this.createElement(this.templateString);
    this.attach(true);
    this.configure();
  }

  private editItemFormHTML() {
    const currentStatus = this.renderItemStatusBtn(Category.TODO);
    return `
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="form-modal-bg hidden modal-bg-ease-out" id="edit-item-modal-background"></div>
        <div class="modal-container" id="edit-item-modal-container">
          <div class="form-container" id="edit-item-modal-overlay">
            <div class="form-border modal-ease-out" id="edit-item-modal">
              <div class="form-content">
                <h3 class="form-title">Edit your project</h3>
                <form>
                  <div class="input-container">
                    <label class="form-label" id="edit-item-title-label">Project name</label>
                    <input type="text" class="form-input" id="edit-item-title-input">
                    <p class="form-input-description">Name of your project</p>
                  </div>
                  <div class="input-container">
                    <label class="form-label">Project description</label>
                    <textarea rows="3" class="form-input" id="edit-item-description-input"></textarea>
                    <p class="form-input-description">Brief description of your project</p>
                  </div>
                  <div class="input-container">
                    <div>
                      <button type="button" class="form-category-selector" id="item-status-menu-button" aria-expanded="true" aria-haspopup="true">${currentStatus}</button>
                    </div>
                    <div class="form-category-options dropdown dropdown-ease-out" id="item-status-menu-option" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                      <div class="py-1" role="none">
                        <div class="form-category-option-container group" id="form-category-to-do-option">
                          <svg class="form-category-to-do-option-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>              
                          <span class="form-category-to-do-option-title">To-do</span>
                        </div>
                        <div class="form-category-option-container group" id="form-category-progress-option">
                          <svg class="form-category-progress-option-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                          </svg>
                          <span class="form-category-progress-option-title">In Progress</span>
                        </div>
                        <div class="form-category-option-container group" id="form-category-complete-option">
                          <svg class="form-category-completed-option-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="form-category-completed-option-title">Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="add-btn" id="edit-item-form-submit-btn">Edit Item</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  configure() {
    const statusMenuButton = this.element.querySelector(
      '#item-status-menu-button'
    );
    const toDoOption = this.element.querySelector(
      '#form-category-to-do-option'
    );
    const progressOption = this.element.querySelector(
      '#form-category-progress-option'
    );
    const completeOption = this.element.querySelector(
      '#form-category-complete-option'
    );
    const editItemForm = this.element.querySelector('form') as HTMLElement;
    (this.element as HTMLElement).addEventListener(
      'click',
      this.fadeOut.bind(this)
    );
    statusMenuButton?.addEventListener('click', this.toggleDropdown);
    toDoOption?.addEventListener('click', () =>
      this.updateMenuOption(Category.TODO)
    );
    progressOption?.addEventListener('click', () =>
      this.updateMenuOption(Category.PROGRESS)
    );
    completeOption?.addEventListener('click', () =>
      this.updateMenuOption(Category.COMPLETED)
    );
    editItemForm.addEventListener('submit', this.onEdit.bind(this));
  }

  fadeIn(title: string, description: string, status: Category) {
    const editTitleInput = document.getElementById('edit-item-title-input');
    const editDescriptionInput = document.getElementById(
      'edit-item-description-input'
    );
    const editStatusInput = document.getElementById('item-status-menu-button');
    if (editTitleInput) {
      (editTitleInput as HTMLInputElement).value = title;
    }
    if (editDescriptionInput) {
      (editDescriptionInput as HTMLTextAreaElement).value = description;
    }
    if (editStatusInput) {
      (editStatusInput as HTMLElement).innerHTML =
        this.renderItemStatusBtn(status);
    }
    this.renderModal(
      'edit-item-modal',
      'edit-item-modal-background',
      'edit-item-modal-container'
    );
  }

  private fadeOut(e: MouseEvent) {
    const modalOverlay = (e.target as HTMLElement).matches(
      '#edit-item-modal-overlay'
    );
    if (modalOverlay) {
      (this.view as ProjectView).editItemFormClosed();
      this.removeModal(
        'edit-item-modal',
        'edit-item-modal-background',
        'edit-item-modal-container'
      );
    }
  }

  private toggleDropdown() {
    const menu = document.getElementById('item-status-menu-option');
    if (menu?.classList.contains('dropdown')) {
      menu?.classList.toggle('dropdown');
      setTimeout(() => {
        menu?.classList.toggle('dropdown-ease-out');
        menu?.classList.toggle('dropdown-ease-in');
      }, 200);
    } else {
      menu?.classList.toggle('dropdown-ease-in');
      menu?.classList.toggle('dropdown-ease-out');
      setTimeout(() => {
        menu?.classList.toggle('dropdown');
      }, 200);
    }
  }

  private updateMenuOption(status: Category) {
    const statusBtn = document.getElementById('item-status-menu-button');
    if (statusBtn) {
      statusBtn.innerHTML = this.renderItemStatusBtn(status);
      this.toggleDropdown();
    }
  }

  private onEdit(e: SubmitEvent) {
    e.preventDefault();
    const itemTitle = (
      document.getElementById('edit-item-title-input') as HTMLInputElement
    ).value;
    const itemDescription = (
      document.getElementById(
        'edit-item-description-input'
      ) as HTMLTextAreaElement
    ).value;
    const itemStatus = this.getEditedStatus();
    (this.view as ProjectView).editItemBtnClicked(
      itemTitle,
      itemDescription,
      itemStatus
    );
    this.removeModal(
      'edit-item-modal',
      'edit-item-modal-background',
      'edit-item-modal-container'
    );
  }

  private renderItemStatusBtn(status: Category) {
    if (status === Category.TODO) {
      return `
        <div class="items-list-title-container" id="item-status-menu-to-do">
          <svg class="items-list-to-do-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>              
          <span class="items-list-to-do-title">To-do</span>
        </div>
      `;
    } else if (status === Category.PROGRESS) {
      return `
        <div class="items-list-title-container" id="item-status-menu-progress">
          <svg class="items-list-progress-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>              
          <span class="items-list-progress-title">In Progress</span>
        </div>
      `;
    } else if (status === Category.COMPLETED) {
      return `
        <div class="items-list-title-container" id="item-status-menu-complete">
          <svg class="items-list-completed-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="items-list-completed-title">Completed</span>
        </div>
      `;
    } else {
      return `
        <div class="items-list-title-container" id="item-status-menu-to-do">
          <svg class="items-list-to-do-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>              
          <span class="items-list-to-do-title">To-do</span>
        </div>
      `;
    }
  }

  private getEditedStatus() {
    const statusElement = document.getElementById('item-status-menu-button');
    const editedStatusId = statusElement?.firstElementChild?.id;
    switch (editedStatusId) {
      case 'item-status-menu-to-do':
        return Category.TODO;
      case 'item-status-menu-progress':
        return Category.PROGRESS;
      case 'item-status-menu-complete':
        return Category.COMPLETED;
      default:
        return Category.TODO;
    }
  }
}
