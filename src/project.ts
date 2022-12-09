import { Item, Status, Utils } from './utils';

export class Project {
  title: string;
  description: string;
  date: Date;
  item: Item;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.date = new Date();
    this.item = {
      title: 'First Item',
      status: Status.INCOMPLETE
    };
  }

  progress(this: Project) {
    if (this.item.status === Status.COMPLETED) {
      return Utils.buildProgress(100);
    } else {
      return Utils.buildProgress(0);
    }
  }

  add(this: Project, item: Item) {
    this.item = item;
  }
}
