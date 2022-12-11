import { Item, Status, Utils } from './utils';

export class ItemsList {
  items: Item[] = [];

  constructor(items: Item[]) {
    this.items = items;
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

  add(item: Item) {
    this.items.push(item);
    return new ItemsList(this.items);
  }

  delete(item: Item) {
    const items: Item[] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (
        !(
          item.title === this.items[i].title &&
          item.status === this.items[i].status
        )
      ) {
        items.push(this.items[i]);
      }
    }
    return new ItemsList(items);
  }
}
