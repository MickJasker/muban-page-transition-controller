import { getComponentForElement } from 'muban-core';
import AbstractComponent from '../../AbstractComponent';
import TransitionComponent from '../../general/transition-component/TransitionComponent';
import {
  initialisePageTransitions,
  PageTransitionController,
  updateLinkElements,
} from 'muban-page-transition-controller';

// eslint-disable-next-line import/no-mutable-exports
export let pageTransitionController: PageTransitionController | null = null;

export default class App extends AbstractComponent {
  public static readonly displayName: string = 'app-root';

  // eslint-disable-next-line no-useless-constructor
  public constructor(element: HTMLElement) {
    super(element);
  }

  private get transitionComponent() {
    return getComponentForElement<TransitionComponent>(
      this.getElement(`[data-component="${TransitionComponent.displayName}"]`)!,
    );
  }

  public async adopted(): Promise<void> {
    if (!pageTransitionController) {
      pageTransitionController = await initialisePageTransitions({
        linkElements: this.getElements<HTMLAnchorElement>('a'),
        renderMode: 'dynamic',
        onBeforeNavigateOut: async () => this.transitionComponent.transitionOut(),
        onBeforeNavigateIn: async () => this.transitionComponent.transitionIn(),
        onNavigationComplete: () => {
          if (pageTransitionController) {
            updateLinkElements(pageTransitionController, this.getElements<HTMLAnchorElement>('a'));
          }
        },
      });

      await this.transitionComponent.transitionIn();
    }
  }

  public dispose() {
    // clean up stuff when hot reloading
    super.dispose();
  }
}
