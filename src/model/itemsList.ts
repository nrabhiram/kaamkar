import { Position } from '../utils';
import { Description } from './description';
import { Item } from './item';
import { ItemTitle } from './itemTitle';
import { Category, Status } from './status';

export class ItemsList {
  items: Item[] = [];
  private _itemsCreated: number;

  constructor(items?: Item[]) {
    let highestId = 0;
    if (items && items.length > 0) {
      this.items = items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id > highestId) {
          highestId = items[i].id;
        }
      }
      this._itemsCreated = highestId + 1;
    } else {
      this.items = [];
      this._itemsCreated = 0;
    }
  }

  private itemsOfStatus(status: Status) {
    const items: Item[] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (status.equals(this.items[i].status)) {
        items.push(this.items[i]);
      }
    }
    return new ItemsList(items);
  }

  private findItemIndex(item: Item) {
    for (let i = 0; i < this.items.length; i++) {
      if (item.id === this.items[i].id) {
        return i;
      }
    }
    return 0;
  }

  toDoItems() {
    const status = new Status(Category.TODO);
    return this.itemsOfStatus(status);
  }

  progressItems() {
    const status = new Status(Category.PROGRESS);
    return this.itemsOfStatus(status);
  }

  completeItems() {
    const status = new Status(Category.COMPLETED);
    return this.itemsOfStatus(status);
  }

  add(title: ItemTitle, description: Description, status: Status) {
    const newItem = new Item(title, description, status, this._itemsCreated);
    this.items.push(newItem);
    this._itemsCreated++;
    return newItem;
  }

  delete(item: Item) {
    const items: Item[] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (item.id !== this.items[i].id) {
        items.push(this.items[i]);
      }
    }
    this.items = items;
  }

  edit(item: Item, title: ItemTitle, description: Description, status: Status) {
    for (let i = 0; i < this.items.length; i++) {
      if (item.id === this.items[i].id) {
        this.items[i].update(title, description, status);
        const lols = this.itemsOfStatus(status).items;
        const lolitem = lols[lols.length - 1];
        this.arrange(this.items[i], lolitem, Position.AFTER);
      }
    }
  }

  arrange(itemMoved: Item, itemToBeMovedTo: Item, position: Position) {
    const newItemIndex = this.findItemIndex(itemToBeMovedTo);
    const itemIndex = this.findItemIndex(itemMoved);
    const increment = newItemIndex < itemIndex ? -1 : 1;
    for (let j = itemIndex; j !== newItemIndex; j += increment) {
      this.items[j] = this.items[j + increment];
    }
    this.items[newItemIndex] = itemMoved;
  }
}
