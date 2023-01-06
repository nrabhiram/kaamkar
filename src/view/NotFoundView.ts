import { Footer } from '../components/pageLayouts/footer';
import { Mesh } from '../components/pageLayouts/mesh';
import { NavBar } from '../components/pageLayouts/navBar';
import { NotFound } from '../components/pageLayouts/notFound';
import { PageView } from './pageView';

export class NotFoundView extends PageView {
  constructor() {
    super();
  }

  render() {
    this.clear();
    new Mesh(this);
    new NavBar(this);
    new NotFound(this);
    new Footer(this);
  }
}
