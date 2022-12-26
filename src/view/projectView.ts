import { PageView } from './pageView';
import { Category } from '../model/status';

type renderedItem = {
  title: string;
  description: string;
  status: Category;
  id: number;
};

export class ProjectView extends PageView {
  private addItemForm: string;
  private editItemForm: string;
  private deleteItemModal: string;
  private static addedHandlers = false;
  private static itemsContainerEle: any;
  private static adjacentItemEle: any;
  private static selectedItem = {
    title: '',
    description: '',
    status: Category.TODO,
    id: -1
  };
  private static adjacentItem = {
    title: '',
    description: '',
    status: Category.TODO,
    id: -1
  };
  private static selectedItemContainerCategory = Category.TODO;

  private static getDragAfterElement(container: any, y: number) {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(.dragging)')
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  private static buildItem(
    element: any,
    itemObject: {
      title: string;
      description: string;
      status: Category;
      id: number;
    }
  ) {
    let itemDescriptionElement;
    if (element.querySelector('.full-item-description')) {
      itemDescriptionElement = element.querySelector('.full-item-description');
    } else if (element.querySelector('.truncated-item-description')) {
      itemDescriptionElement = element.querySelector(
        '.truncated-item-description'
      );
    }
    const itemTitle = element.querySelector('.item-title').innerText;
    const itemDescription = itemDescriptionElement.innerText;
    const itemContainerId = element.parentElement.id;
    itemObject['id'] = +element.id.split('-')[1];
    itemObject['title'] = itemTitle;
    itemObject['description'] = itemDescription;
    itemObject['status'] = this.itemContainerStatus(itemContainerId);
  }

  private static clearItem(itemObject: {
    title: string;
    description: string;
    status: Category;
    id: number;
  }) {
    itemObject['id'] = -1;
    itemObject['title'] = '';
    itemObject['description'] = '';
    itemObject['status'] = Category.TODO;
  }

  private static itemContainerStatus(itemContainerId?: string) {
    switch (itemContainerId) {
      case 'to-do-items-container':
        return Category.TODO;
      case 'progress-items-container':
        return Category.PROGRESS;
      case 'complete-items-container':
        return Category.COMPLETED;
      default:
        return Category.TODO;
    }
  }

  constructor() {
    super();
    this.addItemForm = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="form-modal-bg hidden modal-bg-ease-out" id="add-item-modal-background"></div>
            <div class="modal-container" id="add-item-modal-container">
                <div class="form-container" id="add-item-modal-overlay">
                    <div class="form-border modal-ease-out" id="add-item-modal">
                        <div class="form-content">
                            <h3 class="form-title">Create a new item</h3>
                            <form action="#" method="POST">
                                <div class="my-2">
                                    <label for="first-name" class="form-label" id="add-item-title-label">Item name</label>
                                    <input type="text" name="first-name" class="form-input" id="add-item-title-input">
                                    <p class="form-input-description">Name of your item</p>
                                </div>
                                <div class="my-2">
                                    <label for="about" class="form-label">Item description</label>
                                    <textarea name="about" rows="3" class="form-input" id="add-item-description-input"></textarea>
                                    <p class="form-input-description">Brief description of your item</p>
                                </div>
                            </form>
                            <button type="submit" class="add-btn" id="add-item-form-submit-btn">Create Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.editItemForm = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="form-modal-bg hidden modal-bg-ease-out" id="edit-item-modal-background"></div>
            <div class="modal-container" id="edit-item-modal-container">
                <div class="form-container" id="edit-item-modal-overlay">
                    <div class="form-border modal-ease-out" id="edit-item-modal">
                        <div class="form-content">
                            <h3 class="form-title">Edit your project</h3>
                            <form action="#" method="POST">
                                <div class="my-2">
                                    <label for="first-name" class="form-label" id="edit-item-title-label">Project name</label>
                                    <input type="text" name="first-name" class="form-input" id="edit-item-title-input">
                                    <p class="form-input-description">Name of your project</p>
                                </div>
                                <div class="my-2">
                                    <label for="about" class="form-label">Project description</label>
                                    <textarea name="about" rows="3" class="form-input" id="edit-item-description-input"></textarea>
                                    <p class="form-input-description">Brief description of your project</p>
                                </div>
                                <div class="my-2">
                                    <div>
                                        <button type="button" class="form-category-selector" id="item-status-menu-button" aria-expanded="true" aria-haspopup="true"></button>
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
                            </form>
                            <button type="submit" class="add-btn" id="edit-item-form-submit-btn">Edit Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.deleteItemModal = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="msg-modal-bg hidden modal-bg-ease-out" id="delete-item-modal-background"></div>
            <div class="modal-container" id="delete-item-modal-container">
                <div class="msg-container" id="delete-item-modal-overlay">
                    <div class="msg-border modal-ease-out" id="delete-item-modal">
                        <div class="msg-content">
                            <div class="msg-text-content-container">
                                <div class="msg-icon-container">
                                    <svg class="msg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div class="msg-text">
                                    <h3 class="msg-title" id="modal-title">Delete item</h3>
                                    <div class="mt-2">
                                    <p class="msg-description">Are you sure you want to delete this item? It will be permanently removed and the action cannot be undone.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="msg-btn-container">
                            <button type="button" class="msg-delete-btn" id="delete-item-modal-delete-btn">Delete</button>
                            <button type="button" class="msg-cancel-btn" id="delete-item-modal-cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.init();
  }

  private init() {
    if (!ProjectView.addedHandlers) {
      document.addEventListener('click', (e: any) => {
        const addItemButton = e.target.matches(
          '#add-item-btn, #add-item-btn *'
        );
        const editItemButton = e.target.matches(
          '.edit-item-btn,  .edit-item-btn *'
        );
        const deleteItemButton = e.target.matches(
          '.delete-item-btn, .delete-item-btn *'
        );
        if (editItemButton || deleteItemButton) {
          const itemElement = e.target.closest('.item-card');
          if (itemElement) {
            ProjectView.buildItem(itemElement, ProjectView.selectedItem);
          }
        }
        if (addItemButton) {
          this.renderAddItemForm();
        } else if (editItemButton) {
          this.renderEditItemForm(
            ProjectView.selectedItem['title'],
            ProjectView.selectedItem['description']
          );
        } else if (deleteItemButton) {
          this.renderDeleteItemModal();
        }
      });
      document.addEventListener('click', (e: any) => {
        const addItemForm = e.target.matches('#add-item-modal-overlay');
        const editItemForm = e.target.matches('#edit-item-modal-overlay');
        const deleteItemForm = e.target.matches('#delete-item-modal-overlay');
        const cancelDeleteItemButton = e.target.matches(
          '#delete-item-modal-cancel-btn'
        );
        if (addItemForm) {
          this.removeAddItemForm();
        } else if (editItemForm) {
          this.removeEditItemForm();
        } else if (deleteItemForm || cancelDeleteItemButton) {
          this.removeDeleteItemModal();
        }
      });
      document.addEventListener('click', (e: any) => {
        const statusMenuButton = e.target.matches(
          '#item-status-menu-button, #item-status-menu-button *'
        );
        if (statusMenuButton) {
          this.toggleDropdown('item-status-menu-option');
        }
      });
      document.addEventListener('click', (e: any) => {
        const toDoOption = e.target.matches(
          '#form-category-to-do-option, #form-category-to-do-option *'
        );
        const progressOption = e.target.matches(
          '#form-category-progress-option, #form-category-progress-option *'
        );
        const completeOption = e.target.matches(
          '#form-category-complete-option, #form-category-complete-option *'
        );
        const statusBtn = document.getElementById('item-status-menu-button');
        if (statusBtn) {
          if (toDoOption) {
            statusBtn.innerHTML = this.renderItemStatusBtn(Category.TODO);
          } else if (progressOption) {
            statusBtn.innerHTML = this.renderItemStatusBtn(Category.PROGRESS);
          } else if (completeOption) {
            statusBtn.innerHTML = this.renderItemStatusBtn(Category.COMPLETED);
          }
        }
        if (toDoOption || progressOption || completeOption) {
          this.toggleDropdown('item-status-menu-option');
        }
      });
      document.addEventListener('click', (e: any) => {
        const readButton = e.target.matches('.read-btn, .read-btn *');
        if (readButton) {
          const projectElement = e.target.closest('.item-card');
          this.toggleDescription(
            projectElement,
            '.truncated-item-description',
            '.full-item-description'
          );
        }
      });
      document.addEventListener('dragstart', (e: any) => {
        const itemCard = e.target.matches('.item-card');
        if (itemCard) {
          e.target.classList.add('dragging');
          const itemElement = e.target;
          ProjectView.buildItem(itemElement, ProjectView.selectedItem);
          ProjectView.clearItem(ProjectView.adjacentItem);
        }
      });
      document.addEventListener('dragover', (e: any) => {
        e.preventDefault();
        const itemsListContainer = e.target.matches(
          '.items-list-container, .items-list-container *'
        );
        if (itemsListContainer) {
          const itemsListContainerEle = e.target.closest(
            '.items-list-container'
          );
          const dragging = document.querySelector('.dragging');
          ProjectView.itemsContainerEle =
            itemsListContainerEle?.querySelector('.items-container');
          if (ProjectView.itemsContainerEle) {
            ProjectView.selectedItemContainerCategory =
              ProjectView.itemContainerStatus(ProjectView.itemsContainerEle.id);
          }
          ProjectView.adjacentItemEle = ProjectView.getDragAfterElement(
            ProjectView.itemsContainerEle,
            e.clientY
          );
          if (ProjectView.adjacentItemEle != null) {
            ProjectView.buildItem(
              ProjectView.adjacentItemEle,
              ProjectView.adjacentItem
            );
            ProjectView.itemsContainerEle?.insertBefore(
              dragging,
              ProjectView.adjacentItemEle
            );
          } else {
            ProjectView.itemsContainerEle?.appendChild(dragging);
          }
        }
      });
      ProjectView.addedHandlers = true;
    }
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
            </div>`;
    }
  }

  private project(
    title: string,
    toDoItems: renderedItem[],
    progressItems: renderedItem[],
    completeItems: renderedItem[]
  ) {
    return `
        <div class="app-body">
            <div class="app-head">
                <div class="page-title">
                    <h1 class="page-heading">
                        ${title}
                    </h1>
                    <p class="page-description">
                        Create tasks, prioritize them, and crush it!
                    </p>
                </div>
                <button type="button" class="add-btn" id="add-item-btn">
                    <svg class="add-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Create a New Item
                </button>
            </div>
            <div class="items-grid-container">
                <div class="items-grid">
                    <div class="items-list-container">
                        <div class="items-list-title-container">
                            <svg class="items-list-to-do-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>              
                            <span class="items-list-to-do-title">To-do</span>
                        </div>
                        <div class="items-container" id="to-do-items-container">${toDoItems
                          .map(this.renderItem)
                          .join('')}</div>
                    </div>
                    <div class="items-list-container">
                        <div class="items-list-title-container">
                            <svg class="items-list-progress-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>              
                            <span class="items-list-progress-title">In Progress</span>
                        </div>
                        <div class="items-container" id="progress-items-container">${progressItems
                          .map(this.renderItem)
                          .join('')}</div>
                    </div>
                    <div class="items-list-container">
                        <div class="items-list-title-container">
                            <svg class="items-list-completed-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="items-list-completed-title">Completed</span>
                        </div>
                        <div class="items-container" id="complete-items-container">${completeItems
                          .map(this.renderItem)
                          .join('')}</div>
                    </div>
                </div>
            </div>
        </div>`;
  }

  private renderItem(item: {
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
        <div class="item-card draggable" draggable="true" id=item-${item.id}>
            <h5 class="item-title">${item.title}</h5>
            <p class="item-description truncated-item-description">
                ${truncatedDescription}
            </p>
            ${truncatedHTML}
            <div class="item-card-footer">
                <div class="item-options">
                    <button type="button" class="item-btn edit-item-btn mr-2">
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
      `;
  }

  private renderAddItemForm() {
    this.renderModal(
      this.addItemForm,
      'add-item-modal-background',
      'add-item-modal-container',
      'add-item-modal'
    );
  }

  private renderEditItemForm(title: string, description: string) {
    this.renderModal(
      this.editItemForm,
      'edit-item-modal-background',
      'edit-item-modal-container',
      'edit-item-modal'
    );
    this.editFormDefaultInputs(
      title,
      description,
      'edit-item-title-input',
      'edit-item-description-input'
    );
    const statusInputElement = document.getElementById(
      'item-status-menu-button'
    );
    if (statusInputElement) {
      statusInputElement.innerHTML = this.renderItemStatusBtn(
        ProjectView.selectedItem['status']
      );
    }
  }

  private renderDeleteItemModal() {
    this.renderModal(
      this.deleteItemModal,
      'delete-item-modal-background',
      'delete-item-modal-container',
      'delete-item-modal'
    );
  }

  private removeAddItemForm() {
    this.removeModal(
      'add-item-modal-background',
      'add-item-modal-container',
      'add-item-modal'
    );
  }

  private removeEditItemForm() {
    this.removeModal(
      'edit-item-modal-background',
      'edit-item-modal-container',
      'edit-item-modal'
    );
  }

  private removeDeleteItemModal() {
    this.removeModal(
      'delete-item-modal-background',
      'delete-item-modal-container',
      'delete-item-modal'
    );
  }

  render(
    title: string,
    toDoItems: renderedItem[],
    progressItems: renderedItem[],
    completeItems: renderedItem[]
  ) {
    const app = document.querySelector('.app');
    if (app) {
      app.innerHTML = '';
      app.innerHTML = `
                ${this.bg}
                ${this.nav}
                ${this.project(title, toDoItems, progressItems, completeItems)}
                ${this.grow}
                ${this.footer}
            `;
    }
  }

  add(item: {
    title: string;
    description: string;
    status: Category;
    id: number;
  }) {
    const itemHTML = this.renderItem(item);
    let itemContainer;
    switch (item.status) {
      case Category.TODO:
        itemContainer = document.getElementById('to-do-items-container');
        break;
      case Category.PROGRESS:
        itemContainer = document.getElementById('progress-items-container');
        break;
      case Category.COMPLETED:
        itemContainer = document.getElementById('complete-items-container');
        break;
      default:
        itemContainer = document.getElementById('to-do-items-container');
        break;
    }
    itemContainer?.insertAdjacentHTML('beforeend', itemHTML);
    this.removeAddItemForm();
  }

  edit() {
    const itemHTML = document.getElementById(
      `item-${ProjectView.selectedItem['id']}`
    );
    const itemContainerId = itemHTML?.parentElement?.id;
    const itemCurrentStatus = ProjectView.itemContainerStatus(itemContainerId);
    const itemTitle = this.editTitleInput();
    const itemDescription = this.editDescriptionInput();
    const itemStatus = this.editStatusInput();
    const itemId = ProjectView.selectedItem['id'];
    const newItemHTML = this.renderItem({
      title: itemTitle,
      description: itemDescription,
      status: itemStatus,
      id: itemId
    });
    if (itemCurrentStatus === itemStatus) {
      itemHTML?.insertAdjacentHTML('beforebegin', newItemHTML);
      itemHTML?.remove();
    } else {
      itemHTML?.remove();
      switch (itemStatus) {
        case Category.TODO:
          document
            .getElementById('to-do-items-container')
            ?.insertAdjacentHTML('beforeend', newItemHTML);
          break;
        case Category.PROGRESS:
          document
            .getElementById('progress-items-container')
            ?.insertAdjacentHTML('beforeend', newItemHTML);
          break;
        case Category.COMPLETED:
          document
            .getElementById('complete-items-container')
            ?.insertAdjacentHTML('beforeend', newItemHTML);
          break;
        default:
          document
            .getElementById('to-do-items-container')
            ?.insertAdjacentHTML('beforeend', newItemHTML);
      }
    }
    this.removeEditItemForm();
  }

  arrange() {
    const dragging = document.querySelector('.dragging');
    dragging?.classList.remove('dragging');
    ProjectView.clearItem(ProjectView.selectedItem);
    ProjectView.clearItem(ProjectView.adjacentItem);
  }

  delete() {
    document.getElementById(`item-${ProjectView.selectedItem['id']}`)?.remove();
    this.removeDeleteItemModal();
  }

  addTitleInput() {
    return this.titleInput('add-item-title-input');
  }

  editTitleInput() {
    return this.titleInput('edit-item-title-input');
  }

  addDescriptionInput() {
    return this.descriptionInput('add-item-description-input');
  }

  editDescriptionInput() {
    return this.descriptionInput('edit-item-description-input');
  }

  editStatusInput() {
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

  selectedItem() {
    return ProjectView.selectedItem;
  }

  adjacentItem() {
    return ProjectView.adjacentItem;
  }

  selectedItemContainerCategory() {
    return ProjectView.selectedItemContainerCategory;
  }
}
