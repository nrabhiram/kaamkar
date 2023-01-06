import { PageView } from '../../view/pageView';
import { Component } from '../component';

export abstract class Modal extends Component<HTMLElement, Element, PageView> {
  constructor(view: PageView) {
    super('app', view);
  }

  protected renderModal(
    modalId: string,
    modalBgId: string,
    modalContainerId: string
  ) {
    const modalBackground = document.getElementById(modalBgId);
    const modalContainer = document.getElementById(modalContainerId);
    const modal = document.getElementById(modalId);
    modalBackground?.classList.toggle('hidden');
    modalContainer?.classList.toggle('hidden');
    modal?.classList.toggle('hidden');
    setTimeout(() => {
      modalBackground?.classList.toggle('modal-bg-ease-out');
      modalBackground?.classList.toggle('modal-bg-ease-in');
      modal?.classList.toggle('modal-ease-out');
      modal?.classList.toggle('modal-ease-in');
    }, 300);
  }

  protected removeModal(
    modalId: string,
    modalBgId: string,
    modalContainerId: string
  ) {
    const modalBackground = document.getElementById(modalBgId);
    const modalContainer = document.getElementById(modalContainerId);
    const modal = document.getElementById(modalId);
    modalBackground?.classList.toggle('modal-bg-ease-out');
    modalBackground?.classList.toggle('modal-bg-ease-in');
    modal?.classList.toggle('modal-ease-out');
    modal?.classList.toggle('modal-ease-in');
    setTimeout(() => {
      modalBackground?.classList.toggle('hidden');
      modalContainer?.classList.toggle('hidden');
      modal?.classList.toggle('hidden');
      const app = modalContainer?.parentNode?.parentNode;
      app?.removeChild(app.children[0]);
    }, 300);
  }

  protected abstract configure(): void;
}
