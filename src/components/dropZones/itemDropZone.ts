import { Category } from '../../model/status';
import { PageView } from '../../view/pageView';
import { ProjectView } from '../../view/projectView';
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
    const itemId = (e.dataTransfer as DataTransfer).getData('text/plain');
    const item = this.getItem(
      dropZonesArr,
      itemsArr,
      e.target as Element,
      itemId
    );
    item.status = this.attachedItem.status;
    const adjacentItemEle = this.getAdjacentItemEle(
      dropZonesArr,
      itemsArr,
      e.target as Element
    );
    (this.view as ProjectView).itemDropped(
      item,
      itemsContainerEle as Element,
      adjacentItemEle
    );
    this.removeHighlight();
  }

  private getItem(
    dropZonesArr: Element[],
    itemsArr: Element[],
    dropZone: Element,
    itemId: string
  ) {
    const itemEle = document.getElementById(itemId) as HTMLElement;
    const itemDropZone1 = itemEle.lastElementChild as Element;
    const itemContainerEle = itemDropZone1.closest('.items-container');
    const itemContainerDropZonesArr = Array.from(
      (itemContainerEle as HTMLElement).querySelectorAll('.drop-zone')
    );
    const itemDropIndex = itemContainerDropZonesArr.indexOf(itemDropZone1);
    const itemDropZone2 = itemContainerDropZonesArr[itemDropIndex - 1];
    const validDropZonesArr = dropZonesArr.filter((dropZone) => {
      return dropZone !== itemDropZone1 && dropZone !== itemDropZone2;
    });
    const droppedIndex = validDropZonesArr.indexOf(dropZone as HTMLElement);
    const remainingProjectArr = itemsArr.filter((item) => {
      return item !== itemEle;
    });
    let adjacentItemEle = itemEle as Element;
    if (!(droppedIndex < 0)) {
      adjacentItemEle = remainingProjectArr[droppedIndex];
    }
    const item = {
      title: '',
      description: '',
      status: Category.TODO,
      id: -1
    };
    if (dropZone === itemDropZone1 || dropZone === itemDropZone2) {
      item.id = +itemEle.id.split('-')[1];
    } else if (adjacentItemEle) {
      item.id = +adjacentItemEle.id.split('-')[1];
    }
    return item;
  }

  private getAdjacentItemEle(
    dropZonesArr: Element[],
    itemsArr: Element[],
    dropZone: Element
  ) {
    const droppedIndex = dropZonesArr.indexOf(dropZone);
    const adjacentItemEle = itemsArr[droppedIndex];
    return adjacentItemEle;
  }
}
