import { Description } from './description';
import { Item } from './item';
import { ItemTitle } from './itemTitle';
import { Category, Status } from './status';

export class ItemsList {
  private _items: { [key in Category]: Item[] } = {
    [Category.TODO]: [],
    [Category.PROGRESS]: [],
    [Category.COMPLETED]: []
  };
  private _itemsCreated: number;

  constructor(items?: Item[]) {
    let highestId = 0;
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        this._items[items[i].status.category].push(items[i]);
        if (items[i].id > highestId) {
          highestId = items[i].id;
        }
      }
      this._itemsCreated = highestId + 1;
    } else {
      this._itemsCreated = 0;
    }
  }

  private itemsOfStatus(status: Status) {
    return new ItemsList(this._items[status.category]);
  }

  private findItemIndex(item: Item) {
    const items = this._items[item.status.category];
    for (let i = 0; i < items.length; i++) {
      if (item.id === items[i].id) {
        return i;
      }
    }
    return -1;
  }

  items() {
    return [
      ...this._items[Category.TODO],
      ...this._items[Category.PROGRESS],
      ...this._items[Category.COMPLETED]
    ];
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
    this._items[status.category].push(newItem);
    this._itemsCreated++;
    return newItem;
  }

  delete(item: Item) {
    const items = this._items[item.status.category];
    const newItems: Item[] = [];
    for (let i = 0; i < items.length; i++) {
      if (item.id !== items[i].id) {
        newItems.push(items[i]);
      }
    }
    this._items[item.status.category] = newItems;
  }

  edit(item: Item, title: ItemTitle, description: Description, status: Status) {
    const items = this._items[item.status.category];
    for (let i = 0; i < items.length; i++) {
      if (item.id === items[i].id) {
        if (item.status.category !== status.category) {
          this._items[status.category].push(items[i]);
          this.delete(items[i]);
        }
        items[i].update(title, description, status);
      }
    }
  }

  arrange(itemMoved: Item, status: Status, itemToBeMovedTo?: Item) {
    const itemIndex = this.findItemIndex(itemMoved);
    if (itemIndex !== -1) {
      const item = this._items[itemMoved.status.category][itemIndex];
      if (!item.status.equals(status)) {
        this._items[status.category].push(item);
        this.delete(item);
        item.update(item.title, item.description, status);
      }
      if (itemToBeMovedTo) {
        const firstItemIndex = this.findItemIndex(item);
        const secondItemIndex = this.findItemIndex(itemToBeMovedTo);
        if (firstItemIndex !== -1 && secondItemIndex !== -1) {
          const items = this._items[status.category];
          const increment = secondItemIndex < firstItemIndex ? -1 : 1;
          for (let j = firstItemIndex; j !== secondItemIndex; j += increment) {
            items[j] = items[j + increment];
          }
          items[secondItemIndex] = item;
        }
      }
    }
  }
}
