import { DisposableManager } from 'seng-disposable-manager';
import { checkCompatibility } from './checkCompatibility';
import { getAppComponent, getElementComponent } from './util/getElementComponent';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { createEventListeners } from './createEventListeners';

export interface PageTransitionOptions {
  /**
   * Selector that the page transition component can be found with
   * */
  readonly transitionComponentSelector: string;
  /**
   * All link elements that can trigger a page navigation with a transition
   * */
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
  /**
   * Callback that is triggered when the navigation flow is complete
   * */
  readonly onNavigationComplete: () => void;
}

export interface PageTransitionController<TransitionComponent extends PageTransitionComponent> {
  /**
   * Returns the component instance that is currently used to handle the page transitions
   * */
  transitionComponent: TransitionComponent;
  /**
   * Return the Disposable Manager that manages all disposable events. [Uses the `seng-disposable-manager` library](https://www.npmjs.com/package/seng-disposable-manager)
   * */
  readonly disposableManager: DisposableManager;
  /**
   * Return all link elements that can trigger a page navigation with a transition
   * */
  linkElements: ReadonlyArray<HTMLAnchorElement>;
  /**
   * Return the current url of the page. Only used internally
   * */
  currentLocation: string;
  /**
   * Function that updates the `currentLocation` property.
   * @param url {string} the url of the new location
   * */
  readonly setCurrentLocation: (url: string) => void;
  /**
   * Function that updates the `linkElements` property.
   * > NOTE: This function doesn't disposes and updates the event listeners, use the `updateLinkElements` function for that
   * */
  readonly setLinkElements: (elements: ReadonlyArray<HTMLAnchorElement>) => void;
  /**
   * Function that resets the transition component and reinitialises it after the new DOM is parsed in
   * */
  readonly resetTransitionComponent: () => Promise<void>;
  /**
   * Callback that is triggered when the navigation flow is complete
   * */
  onNavigationComplete?: () => void;
}

/**
 * Initialise an instance of the `PageTransitionController`
 *
 * @template TransitionComponent extends PageTransitionComponent
 * @param options {PageTransitionOptions} General options for the controller
 * @return Promise<PageTransitionController<TransitionComponent>> Controller instance
 * */
export const initialisePageTransitions = async <
  TransitionComponent extends PageTransitionComponent,
>(
  options: PageTransitionOptions,
): Promise<PageTransitionController<TransitionComponent>> => {
  const disposableManager = new DisposableManager();

  await checkCompatibility();
  await (
    await getAppComponent()
  ).adopted;

  const transitionComponent = await getElementComponent<TransitionComponent>(
    options.transitionComponentSelector,
  );

  const controller: PageTransitionController<TransitionComponent> = {
    transitionComponent,
    disposableManager,
    onNavigationComplete: options.onNavigationComplete,
    currentLocation: location.href,
    linkElements: options.linkElements,
    setCurrentLocation: (url: string) => {
      controller.currentLocation = url;
    },
    setLinkElements: (elements) => {
      controller.linkElements = elements;
    },
    resetTransitionComponent: async (): Promise<void> => {
      controller.transitionComponent = await getElementComponent<TransitionComponent>(
        options.transitionComponentSelector,
      )
    }
  };

  createEventListeners(controller, controller.linkElements);

  return controller;
};
