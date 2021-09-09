import {
  initialisePageTransitions,
  PageTransitionController,
  updateLinkElements,
} from 'muban-page-transition-controller';
import AbstractComponent from '../../AbstractComponent';
import TransitionComponent from '../../general/transition-component/TransitionComponent';

// eslint-disable-next-line import/no-mutable-exports
export let pageTransitionController: PageTransitionController<TransitionComponent> | null = null;

export default class App extends AbstractComponent {
  public static readonly displayName: string = 'app-root';

  // eslint-disable-next-line no-useless-constructor
  public constructor(element: HTMLElement) {
    super(element);

    // for generic app logic
  }

  public async adopted(): Promise<void> {
    if (!pageTransitionController) {
      pageTransitionController = await initialisePageTransitions<TransitionComponent>({
        linkElements: this.getElements<HTMLAnchorElement>('a'),
        transitionComponentSelector: `[data-component="${TransitionComponent.displayName}"]`,
        onBeforeTransitionIn: async () => {
          await this.adopted;
        },
        onNavigationComplete: () => {
          if (!pageTransitionController) return;
          updateLinkElements(pageTransitionController, this.getElements<HTMLAnchorElement>('a'));
        },
      });
    }
  }

  public dispose() {
    // clean up stuff when hot reloading
    super.dispose();
  }
}
