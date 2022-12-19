import { Title } from './title';

export class ProjectTitle extends Title {
  constructor(title: string) {
    if (title.trim().length > 0) {
      super(title);
    } else {
      super('Untitled Project');
    }
  }

  update(title: Title) {
    return new ProjectTitle(title.text);
  }
}
