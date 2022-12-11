export enum Status {
  TODO,
  PROGRESS,
  COMPLETED
}

export interface Item {
  title: string;
  status: Status;
  id: number;
}

export class Utils {
  static buildItem(title: string, status: Status, id: number): Item {
    return {
      title: this.buildTitle(title),
      status: this.buildStatus(status),
      id: id
    };
  }

  static buildProgress(progress: number) {
    return progress;
  }

  static buildStatus(status: Status) {
    return status;
  }

  static buildTitle(title: string) {
    return title;
  }

  static buildDescription(description: string) {
    return description;
  }
}
