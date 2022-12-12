import { Title } from './title';

export class ItemTitle extends Title {
  constructor(title: string) {
    if (title.trim().length > 0) {
      super(title);
    } else {
      super('Untitled Item');
    }
  }

  update(title: Title) {
    return new ItemTitle(title.text);
  }
}
