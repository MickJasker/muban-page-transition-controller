import { CoreComponent } from 'muban-core';
import { PageTransitionComponent } from 'muban-page-transition-controller';

export default class TransitionComponent extends CoreComponent implements PageTransitionComponent {
  public static readonly displayName: string = 'transition-component';

  public transitionIn(): Promise<void> {
    return new Promise(resolve => {
      console.log('in', this.element);
      resolve();
    });
  }

  public transitionOut(): Promise<void> {
    return new Promise(resolve => {
      console.log('out', this.element);
      resolve();
    });
  }

  public setInBetweenTransition(): void {
    console.log('in-between', this.element);
  }

  public dispose() {
    super.dispose();
  }
}
