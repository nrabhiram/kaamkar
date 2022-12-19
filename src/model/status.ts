export enum Category {
  TODO,
  PROGRESS,
  COMPLETED
}

export class Status {
  category: Category;

  constructor(category: Category) {
    this.category = category;
  }

  update(status: Status) {
    return new Status(status.category);
  }

  equals(status: Status) {
    return this.category === status.category;
  }
}
