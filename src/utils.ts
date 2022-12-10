export enum Status {
  INCOMPLETE,
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
      status: status
    };
  }

  static buildProgress(progress: number) {
    return progress;
  }

  static buildItemsList(list: Item[]) {
    return list;
  }
}
