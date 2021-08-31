import { DisposableManager } from 'seng-disposable-manager';
import { checkCompatibility } from './checkCompatibility';
import { getAppComponent, getElementComponent } from './util/getElementComponent';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { createEventListeners } from './createEventListeners';
import type { Url } from './types/Url';

export interface PageTransitionOptions {
  readonly transitionComponentSelector: string;
  readonly onNavigationComplete: () => void;
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
}

export interface PageTransitionController<TransitionComponent extends PageTransitionComponent> {
  transitionComponent: TransitionComponent;
  readonly disposableManager: DisposableManager;
  linkElements: ReadonlyArray<HTMLAnchorElement>;
  currentLocation: Url;
  readonly setCurrentLocation: (url: Url) => void;
  readonly setLinkElements: (elements: ReadonlyArray<HTMLAnchorElement>) => void;
  readonly resetTransitionComponent: () => Promise<void>;
  onNavigationComplete?: () => void;
}

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
    currentLocation: location.href as Url,
    linkElements: options.linkElements,
    setCurrentLocation: (url: Url) => {
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
