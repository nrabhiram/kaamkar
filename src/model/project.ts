import { Description } from './description';
import { Item } from './item';
import { ItemsList } from './itemsList';
import { ItemTitle } from './itemTitle';
import { ProjectTitle } from './projectTitle';
import { Status } from './status';
import { Utils } from '../utils';

export class Project {
  title: ProjectTitle;
  description: Description;
  date: Date;
  items: ItemsList;
  id: number;

  constructor(
    title: ProjectTitle,
    description: Description,
    items: ItemsList,
    id?: number,
    date?: Date
  ) {
    this.title = title;
    this.description = description;
    if (date) {
      this.date = date;
    } else {
      this.date = new Date();
    }
    this.items = items;
    if (id) {
      this.id = id;
    } else {
      this.id = 0;
    }
  }

  progress(this: Project) {
    const completeItems = this.items.completeItems();
    const numCompleteItems = completeItems.items().length;
    const numTotalItems = this.items.items().length;
    let percentage: number;

    if (!numTotalItems) {
      percentage = 0;
    } else {
      percentage = Math.round((numCompleteItems / numTotalItems) * 100);
    }
    return Utils.buildProgress(percentage);
  }

  add(
    this: Project,
    title: ItemTitle,
    description: Description,
    status: Status
  ) {
    const newItem = this.items.add(title, description, status);
    return newItem;
  }

  delete(this: Project, item: Item) {
    this.items.delete(item);
  }

  edit(item: Item, title: ItemTitle, description: Description, status: Status) {
    this.items.edit(item, title, description, status);
  }

  arrange(itemMoved: Item, status: Status, itemToBeMovedTo?: Item) {
    this.items.arrange(itemMoved, status, itemToBeMovedTo);
  }

  update(title: ProjectTitle, description: Description) {
    this.title = this.title.update(title);
    this.description = this.description.update(description);
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
