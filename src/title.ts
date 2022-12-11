export class Title {
  text: string;

  constructor(title: string) {
    if (title.trim().length > 0) {
      this.text = title;
    } else {
      this.text = 'Untitled Project';
    }
  }

  update(title: string) {
    return new Title(title);
  }
}
