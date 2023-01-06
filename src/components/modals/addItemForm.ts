import { ProjectView } from '../../view/projectView';
import { Modal } from './modal';

export class AddItemForm extends Modal {
  templateString: string;

  constructor(view: ProjectView) {
    super(view);
    this.templateString = this.addItemFormHTML();
    this.element = this.createElement(this.templateString);
    this.attach(true);
    this.configure();
  }

  private addItemFormHTML() {
    return `
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="form-modal-bg hidden modal-bg-ease-out" id="add-item-modal-background"></div>
        <div class="modal-container" id="add-item-modal-container">
          <div class="form-container" id="add-item-modal-overlay">
            <div class="form-border modal-ease-out" id="add-item-modal">
              <div class="form-content">
                <h3 class="form-title">Create a new item</h3>
                <form>
                  <div class="input-container">
                    <label for="first-name" class="form-label" id="add-item-title-label">Item name</label>
                    <input type="text" name="first-name" class="form-input" id="add-item-title-input">
                    <p class="form-input-description">Name of your item</p>
                  </div>
                  <div class="input-container">
                    <label for="about" class="form-label">Item description</label>
                    <textarea name="about" rows="3" class="form-input" id="add-item-description-input"></textarea>
                    <p class="form-input-description">Brief description of your item</p>
                  </div>
                  <button type="submit" class="add-btn" id="add-item-form-submit-btn">Create Item</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  configure() {
    const addBtn = this.element.querySelector(
      '#add-item-form-submit-btn'
    ) as HTMLElement;
    (this.element as HTMLElement).addEventListener(
      'click',
      this.fadeOut.bind(this)
    );
    addBtn.addEventListener('click', this.onSubmitBtnClicked.bind(this));
  }

  fadeIn() {
    this.renderModal(
      'add-item-modal',
      'add-item-modal-background',
      'add-item-modal-container'
    );
  }

  private fadeOut(e: MouseEvent) {
    const modalOverlay = (e.target as HTMLElement).matches(
      '#add-item-modal-overlay'
    );
    if (modalOverlay) {
      (this.view as ProjectView).addItemFormClosed();
      this.removeModal(
        'add-item-modal',
        'add-item-modal-background',
        'add-item-modal-container'
      );
    }
  }

  private onSubmitBtnClicked() {
    const itemTitle = (
      document.getElementById('add-item-title-input') as HTMLInputElement
    ).value;
    const itemDescription = (
      document.getElementById('add-item-description-input') as HTMLInputElement
    ).value;
    (this.view as ProjectView).addItemBtnClicked(itemTitle, itemDescription);
    this.removeModal(
      'add-item-modal',
      'add-item-modal-background',
      'add-item-modal-container'
    );
  }
}
