interface Item {
  title: string;
}

export class Utils {
  static build_project(
    title: string,
    description: string
  ): {
    title: string;
    description: string;
    progress: number;
    items: Item[];
  } {
    return {
      title: title,
      description: description,
      progress: 0,
      items: []
    };
  }
}
