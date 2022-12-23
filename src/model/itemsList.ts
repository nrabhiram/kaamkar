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
        const currentItem = this.items[i];
        let newItemIndex = 0;
        if (currentItem.status.category === Category.TODO) {
          newItemIndex = this.toDoItems().items.length - 1;
        } else if (currentItem.status.category === Category.PROGRESS) {
          newItemIndex =
            this.toDoItems().items.length +
            this.progressItems().items.length -
            1;
        } else if (currentItem.status.category === Category.COMPLETED) {
          newItemIndex =
            this.toDoItems().items.length +
            this.progressItems().items.length +
            this.completeItems().items.length -
            1;
        }
        const increment = newItemIndex < i ? -1 : 1;
        for (let j = i; j !== newItemIndex; j += increment) {
          this.items[j] = this.items[j + increment];
        }
        this.items[newItemIndex] = currentItem;
        return;
      }
    }
  }
}
