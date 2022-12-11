import { ItemsList } from './itemsList';
import { Title } from './title';
import { Item, Status, Utils } from './utils';

export class Project {
  title: Title;
  description: string;
  date: Date;
  items: ItemsList;
  private _createdItems: number;

  constructor(title: string, description: string, items: ItemsList) {
    this.title = new Title(title);
    this.description = description;
    this.date = new Date();
    this.items = items;
    this._createdItems = 0;
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

  add(this: Project, title: string, status: Status) {
    this.items = this.items.add(
      Utils.buildTitle(title),
      Utils.buildStatus(status),
      this._createdItems
    );
    this._createdItems++;
  }

  delete(this: Project, item: Item) {
    this.items = this.items.delete(item);
  }

  update(title: string, description: string) {
    this.title = this.title.update(title);
    this.description = description;
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
