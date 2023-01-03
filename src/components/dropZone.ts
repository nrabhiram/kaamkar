import { Category } from '../model/status';
import { PageView } from '../view/pageView';
import { ProjectView } from '../view/projectView';
import { Component } from './component';

export class DropZone extends Component<HTMLElement, Element, PageView> {
  attachedItem: {
    title: string;
    description: string;
    status: Category;
    id: number;
  };

  constructor(
    hostElementId: string,
    view: PageView,
    insertAtStart: boolean,
    item: {
      title: string;
      description: string;
      status: Category;
      id: number;
    }
  ) {
    super(hostElementId, view);
    this.attachedItem = item;
    this.templateString = this.dropZoneHTML();
    this.element = this.createElement(this.templateString);
    this.attach(insertAtStart);
    this.configure();
  }

  private dropZoneHTML() {
    return `<div class="drop-zone drop-zone-inactive"></div>`;
  }

  configure() {
    (this.element as HTMLElement).addEventListener(
      'dragover',
      this.dragOverHandler.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'dragleave',
      this.dragLeaveHandler.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'drop',
      this.dropHandler.bind(this)
    );
  }

  private dragOverHandler(e: DragEvent) {
    e.preventDefault();
    if (this.element.classList.contains('drop-zone-inactive')) {
      this.addHighlight();
    }
  }

  private dragLeaveHandler(e: DragEvent) {
    e.preventDefault();
    if (!this.element.classList.contains('drop-zone-inactive')) {
      this.removeHighlight();
    }
  }

  private addHighlight() {
    this.element.classList.remove('drop-zone-inactive');
    this.element.classList.add('drop-zone-active');
  }

  private removeHighlight() {
    this.element.classList.remove('drop-zone-active');
    this.element.classList.add('drop-zone-inactive');
  }

  private dropHandler(e: DragEvent) {
    const itemsContainerEle = (e.target as HTMLElement).closest(
      '.items-container'
    );
    const dropZonesArr = Array.from(
      (itemsContainerEle as HTMLElement).querySelectorAll('.drop-zone')
    );
    const itemsArr = Array.from(
      (itemsContainerEle as HTMLElement).querySelectorAll(
        '.item-card-container'
      )
    );
    const droppedIndex = dropZonesArr.indexOf(e.target as HTMLElement);
    const adjacentItemEle = itemsArr[droppedIndex];
    const item = {
      title: '',
      description: '',
      status: this.attachedItem.status,
      id: -1
    };
    if (adjacentItemEle) {
      item.id = +adjacentItemEle.id.split('-')[1];
    }
    (this.view as ProjectView).itemDropped(
      item,
      itemsContainerEle!,
      adjacentItemEle
    );
    this.removeHighlight();
  }
}
