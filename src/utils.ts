export enum Status {
  INCOMPLETE,
  COMPLETED
}

export interface Item {
  title: string;
  status: Status;
}

export class Utils {
  static buildProgress(progress: number) {
    return progress;
  }
}
