export enum Status {
  TODO,
  PROGRESS,
  COMPLETED
}

export interface Item {
  title: string;
  status: Status;
}

export class Utils {
  static buildItem(title: string, status: Status) {
    return {
      title: title,
      status: this.buildStatus(status)
    };
  }

  static buildProgress(progress: number) {
    return progress;
  }

  static buildItemsList(list: Item[]) {
    return list;
  }

  static buildStatus(status: Status) {
    return status;
  }
}
