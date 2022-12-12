import { Description } from './description';
import { ItemTitle } from './itemTitle';
import { Status } from './utils';

export class Item {
  title: ItemTitle;
  description: Description;
  status: Status;

  constructor(title: ItemTitle, description: Description, status: Status) {
    this.title = title;
    this.description = description;
    this.status = status;
  }

  update(item: Item) {
    return item;
  }
}
