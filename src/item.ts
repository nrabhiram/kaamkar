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
    const updatedTitle = this.title.update(item.title);
    const updatedDescription = this.description.update(item.description);
    const updatedStatus = item.status;
    return new Item(updatedTitle, updatedDescription, updatedStatus);
  }
}
