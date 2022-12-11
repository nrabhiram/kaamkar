import { ItemsList } from './itemsList';
import { Item, Utils } from './utils';

export class Project {
  title: string;
  description: string;
  date: Date;
  items: ItemsList;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.date = new Date();
    this.items = new ItemsList([]);
  }

  progress(this: Project) {
    const completeItems = this.items.completeItems();
    const numCompleteItems = completeItems.items.length;
    const numTotalItems = this.items.items.length;
    let percentage: number;

    if (!numTotalItems) {
      percentage = 0;
    } else {
      percentage = Math.round((numCompleteItems / numTotalItems) * 100);
    }
    return Utils.buildProgress(percentage);
  }

  add(this: Project, item: Item) {
    this.items = this.items.add(item);
  }

  toDoItems() {
    return this.items.toDoItems();
  }

  progressItems() {
    return this.items.progressItems();
  }

  completeItems() {
    return this.items.completeItems();
  }
}
