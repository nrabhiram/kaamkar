export class Description {
  text: string;

  constructor(description: string) {
    this.text = description;
  }

  update(description: Description) {
    return new Description(description.text);
  }
}
