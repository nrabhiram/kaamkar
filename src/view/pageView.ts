export abstract class PageView {
  abstract render(...args: any[]): void;

  protected clear() {
    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = '';
  }
}
