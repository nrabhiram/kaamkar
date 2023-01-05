import { Category } from '../model/status';
import { PageView } from '../view/pageView';
import { ProjectView } from '../view/projectView';
import { DropZone } from './dropZone';

export class ItemDropZone extends DropZone {
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
    super(hostElementId, view, insertAtStart);
    this.attachedItem = item;
  }

  protected dropHandler(e: DragEvent) {
    e.preventDefault();
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
