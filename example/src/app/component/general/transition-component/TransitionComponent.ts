import { CoreComponent } from 'muban-core';
import { gsap } from 'gsap';

export default class TransitionComponent extends CoreComponent {
  public static readonly displayName: string = 'transition-component';

  public adopted(): void {
    this.setInBetweenTransition();
  }

  public async transitionIn(): Promise<void> {
    return new Promise(resolve => {
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          this.element,
          {
            autoAlpha: 1,
          },
          {
            autoAlpha: 0,
            delay: 0.1,
            onComplete: resolve,
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
