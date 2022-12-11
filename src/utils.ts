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
      title: this.buildTitle(title),
      status: this.buildStatus(status)
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
