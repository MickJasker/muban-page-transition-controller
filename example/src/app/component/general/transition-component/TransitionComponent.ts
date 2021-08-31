import { CoreComponent } from 'muban-core';
import { PageTransitionComponent } from 'muban-page-transition-controller';
import { gsap } from 'gsap';

export default class TransitionComponent extends CoreComponent implements PageTransitionComponent {
  public static readonly displayName: string = 'transition-component';

  public transitionIn(): Promise<void> {
    return new Promise(resolve => {
      const timeline = gsap.timeline({
        onComplete: resolve,
      });
      timeline
        .fromTo(
          this.element,
          {
            autoAlpha: 1,
          },
          {
            autoAlpha: 0,
          },
        )
        .set(this.element, {
          width: 0,
          autoAlpha: 1,
        });
    });
  }

  public transitionOut(): Promise<void> {
    return new Promise(resolve => {
      const timeline = gsap.timeline({
        onComplete: resolve,
      });
      timeline.fromTo(
        this.element,
        {
          width: 0,
        },
        {
          width: '100%',
        },
      );
    });
  }

  public setInBetweenTransition(): void {
    gsap.set(this.element, {
      width: '100%',
    });
  }

  public dispose() {
    super.dispose();
  }
}
