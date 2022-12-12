import { Description } from './description';
import { Item } from './item';
import { ItemTitle } from './itemTitle';
import { Category, Status } from './status';

export class ItemsList {
  items: Item[] = [];

  constructor(items?: Item[]) {
    if (items) {
      this.items = items;
    } else {
      this.items = [];
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

  add(title: ItemTitle, description: Description, status: Status, id: number) {
    const newItem = new Item(title, description, status, id);
    this.items.push(newItem);
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
}
