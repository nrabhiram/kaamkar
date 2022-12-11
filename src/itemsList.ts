import { Item, Status, Utils } from './utils';

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
      if (this.items[i]?.status === status) {
        items.push(this.items[i]);
      }
    }
    return new ItemsList(items);
  }

  toDoItems() {
    return this.itemsOfStatus(Utils.buildStatus(Status.TODO));
  }

  progressItems() {
    return this.itemsOfStatus(Utils.buildStatus(Status.PROGRESS));
  }

  completeItems() {
    return this.itemsOfStatus(Utils.buildStatus(Status.COMPLETED));
  }

  add(title: string, status: Status, id: number) {
    const newItem = Utils.buildItem(
      Utils.buildTitle(title),
      Utils.buildStatus(status),
      id
    );
    this.items.push(newItem);
    return new ItemsList(this.items);
  }

  delete(item: Item) {
    const items: Item[] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (item.id !== this.items[i].id) {
        items.push(this.items[i]);
      }
    }
    return new ItemsList(items);
  }
}
