export class Project {
  title: string;
  description: string;
  date: Date;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.date = new Date();
  }

  progress(this: Project) {
    return 0;
  }
}
