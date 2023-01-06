import { Category } from '../../model/status';
import { ProjectView } from '../../view/projectView';
import { Component } from '../component';
import { ItemDropZone } from '../dropZones/itemDropZone';

export class Project extends Component<HTMLElement, Element, ProjectView> {
  title: string;

  constructor(title: string, view: ProjectView) {
    super('app', view);
    this.title = title;
    this.templateString = this.projectHTML(title);
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
    new ItemDropZone('to-do-items-container', view, false, {
      title: '',
      description: '',
      status: Category.TODO,
      id: -1
    });
    new ItemDropZone('progress-items-container', view, false, {
      title: '',
      description: '',
      status: Category.PROGRESS,
      id: -1
    });
    new ItemDropZone('complete-items-container', view, false, {
      title: '',
      description: '',
      status: Category.COMPLETED,
      id: -1
    });
  }

  private projectHTML(title: string) {
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
              <div class="items-container" id="to-do-items-container">
              </div>
            </div>
            <div class="items-list-container">
              <div class="items-list-title-container">
                <svg class="items-list-progress-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>              
                <span class="items-list-progress-title">In Progress</span>
              </div>
              <div class="items-container" id="progress-items-container">
              </div>
            </div>
            <div class="items-list-container">
              <div class="items-list-title-container">
                <svg class="items-list-completed-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="items-list-completed-title">Completed</span>
              </div>
              <div class="items-container" id="complete-items-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  configure() {
    const addBtn = this.element.querySelector('#add-item-btn');
    addBtn?.addEventListener('click', this.onAddBtnClicked.bind(this));
  }

  private onAddBtnClicked() {
    this.view.addItemFormBtnClicked();
  }
}
