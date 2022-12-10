import { Item, Status, Utils } from './utils';

export class Project {
  title: string;
  description: string;
  date: Date;
  items: Item[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.date = new Date();
    this.items = Utils.buildItemsList([]);
  }

  progress(this: Project) {
    let numCompletedItems = 0;
    const numTotalItems = this.items.length;
    let percentage: number;
    if (!numTotalItems) {
      percentage = 0;
    } else {
      for (let i = 0; i < numTotalItems; i++) {
        if (this.items[i]?.status === Status.COMPLETED) {
          numCompletedItems++;
        }
      }
      percentage = Math.round((numCompletedItems / numTotalItems) * 100);
    }
    return Utils.buildProgress(percentage);
  }

  add(this: Project, item: Item) {
    this.items.push(item);
  }

  toDoItems() {
    const toDoItems = this.items;
    return Utils.buildItemsList(toDoItems);
  }
}
