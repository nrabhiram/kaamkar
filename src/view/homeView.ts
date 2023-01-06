import { Footer } from '../components/pageLayouts/footer';
import { Hero } from '../components/pageLayouts/hero';
import { Mesh } from '../components/pageLayouts/mesh';
import { NavBar } from '../components/pageLayouts/navBar';
import { PageView } from './pageView';

export class HomeView extends PageView {
  constructor() {
    super();
  }

  render() {
    this.clear();
    new Mesh(this);
    new NavBar(this);
    new Hero(this);
    new Footer(this);
  }
}
