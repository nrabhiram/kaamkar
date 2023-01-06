import { Category } from '../../model/status';
import { ProjectView } from '../../view/projectView';
import { Component } from '../component';
import { ItemDropZone } from '../dropZones/itemDropZone';

export class ItemCard extends Component<HTMLElement, Element, ProjectView> {
  item: {
    title: string;
    description: string;
    status: Category;
    id: number;
  };
  dropZone: ItemDropZone;

  constructor(
    hostElementId: string,
    view: ProjectView,
    item: {
      title: string;
      description: string;
      status: Category;
      id: number;
    }
  ) {
    super(hostElementId, view);
    this.item = item;
    this.templateString = this.itemHTML(item);
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
    this.dropZone = new ItemDropZone(`item-${item.id}`, view, false, item);
  }

  private itemHTML(item: {
    title: string;
    description: string;
    status: Category;
    id: number;
  }) {
    const shouldBeTruncated = item.description.length >= 70;
    let truncatedDescription: string;
    let truncatedHTML: string;
    if (shouldBeTruncated) {
      truncatedDescription = `${item.description.substring(0, 70)}...`;
      truncatedHTML = `
        <p class="item-description collapsible full-item-description">${item.description}</p>
        <button class="read-btn group">
          <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          <span class="read-btn-text">Read more</span>
        </button>
      `;
    } else {
      truncatedDescription = item.description;
      truncatedHTML = '';
    }
    return `
      <div class="item-card-container" draggable="true" id="item-${item.id}">
        <div class="item-card draggable">
          <h5 class="item-title">${item.title}</h5>
          <p class="item-description truncated-item-description">
            ${truncatedDescription}
          </p>
          ${truncatedHTML}
          <div class="item-card-footer">
            <div class="item-options">
              <button type="button" class="item-btn edit-item-btn item-option-spacing">
                <svg class="item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>              
              </button>
              <button type="button" class="item-btn delete-item-btn">
                <svg class="item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
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
    const itemEditBtn = this.element.querySelector('.edit-item-btn');
    const itemDeleteBtn = this.element.querySelector('.delete-item-btn');
    const readBtn = this.element.querySelector('.read-btn');
    itemEditBtn?.addEventListener('click', this.editBtnClick.bind(this));
    itemDeleteBtn?.addEventListener('click', this.deleteBtnClick.bind(this));
    (this.element as HTMLElement).addEventListener(
      'dragstart',
      this.itemDragStart.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'dragend',
      this.itemDragEnd.bind(this)
    );
    if (readBtn) {
      (readBtn as HTMLElement).addEventListener(
        'click',
        this.toggleDescription
      );
    }
  }

  edit(title: string, description: string, status: Category) {
    const item = {
      title: title,
      description: description,
      status: status,
      id: this.item.id
    };
    this.templateString = this.itemHTML(item);
    const editedElement = this.createElement(this.templateString);
    if (this.item.status === status) {
      this.element.replaceWith(editedElement);
    } else {
      this.element.remove();
      const newContainerId = this.getContainerId(item.status);
      const newContainerEle = document.getElementById(
        newContainerId
      ) as HTMLElement;
      newContainerEle.insertAdjacentElement('beforeend', editedElement);
    }
    this.item = item;
    this.dropZone = new ItemDropZone(`item-${item.id}`, this.view, false, item);
    this.element = editedElement;
    this.configure();
  }

  delete() {
    this.element.remove();
  }

  arrange(
    itemsContainerEle: Element,
    newStatus: Category,
    adjacentItemEle?: Element
  ) {
    if (adjacentItemEle) {
      itemsContainerEle?.insertBefore(this.element, adjacentItemEle);
    } else {
      itemsContainerEle?.insertAdjacentElement('beforeend', this.element);
    }
    this.item.status = newStatus;
  }

  private toggleDescription(e: MouseEvent) {
    const itemElement = (e.target as HTMLElement).closest(
      '.item-card-container'
    ) as Element;
    const truncatedDescription = itemElement.querySelector(
      '.truncated-item-description'
    ) as Element;
    const fullDescription = itemElement.querySelector(
      '.full-item-description'
    ) as Element;
    const descriptionButton = itemElement.querySelector('.read-btn') as Element;
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
    const itemElement = (e.target as HTMLElement).closest(
      '.item-card-container'
    );
    if (itemElement) {
      this.view.editItemFormBtnClicked(this, this.item);
    }
  }

  private deleteBtnClick(e: Event) {
    const itemElement = (e.target as HTMLElement).closest(
      '.item-card-container'
    );
    if (itemElement) {
      this.view.deleteItemFormBtnClicked(this, this.item);
    }
  }

  private itemDragStart(e: DragEvent) {
    (e.dataTransfer as DataTransfer).setData(
      'text/plain',
      (e.target as HTMLElement).id
    );
    (e.dataTransfer as DataTransfer).effectAllowed = 'move';
    const itemCardEle = this.element.querySelector('.item-card');
    itemCardEle?.classList.add('dragging');
    (this.view as ProjectView).itemDragged(this, this.item);
  }

  private itemDragEnd() {
    const itemCardEle = this.element.querySelector('.item-card');
    itemCardEle?.classList.remove('dragging');
  }

  private getContainerId(status: Category) {
    switch (status) {
      case Category.TODO:
        return 'to-do-items-container';
      case Category.PROGRESS:
        return 'progress-items-container';
      case Category.COMPLETED:
        return 'complete-items-container';
      default:
        return 'to-do-items-container';
    }
  }
}
