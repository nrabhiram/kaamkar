import { Description } from './description';
import { ItemTitle } from './itemTitle';
import { Status } from './status';

export class Item {
  title: ItemTitle;
  description: Description;
  status: Status;
  id: number;

  constructor(
    title: ItemTitle,
    description: Description,
    status: Status,
    id?: number
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    if (id) {
      this.id = id;
    } else {
      this.id = 0;
    }
  }

  update(title: ItemTitle, description: Description, status: Status) {
    this.title = this.title.update(title);
    this.description = this.description.update(description);
    this.status = this.status.update(status);
  }
}
