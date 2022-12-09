import { Item, Utils } from './utils';

export class Project {
  title: string;
  description: string;
  date: Date;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.date = new Date();
  }

  progress(this: Project) {
    return Utils.buildProgress(0);
  }

  add(this: Project, item: Item) {
    return;
  }
}
