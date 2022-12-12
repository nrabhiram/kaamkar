export abstract class Title {
  text: string;

  constructor(title: string) {
    this.text = title;
  }

  abstract update(title: Title): Title;
}
