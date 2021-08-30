import { DisposableManager } from 'seng-disposable-manager';
import type { ElementSelector } from './types/ElementSelector';
import { checkCompatibility } from './checkCompatibility';
import { getElementComponent } from './util/getElementComponent';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { createEventListeners } from './createEventListeners';
import type { Url } from './types/Url';

export interface PageTransitionOptions {
  readonly transitionComponentSelector: ElementSelector;
  readonly onNavigationComplete: () => void;
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
}

export interface PageTransitionController<TransitionComponent extends PageTransitionComponent> {
  readonly transitionComponent: TransitionComponent;
  readonly disposableManager: DisposableManager;
  linkElements: ReadonlyArray<HTMLAnchorElement>;
  currentLocation: Url;
  readonly setCurrentLocation: (url: Url) => void;
  readonly setLinkElements: (elements: ReadonlyArray<HTMLAnchorElement>) => void;
  onNavigationComplete?: () => void;
}

export const initialisePageTransitions = async <
  TransitionComponent extends PageTransitionComponent,
>(
  options: PageTransitionOptions,
): Promise<PageTransitionController<TransitionComponent>> => {
  const disposableManager = new DisposableManager();

  await checkCompatibility();

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
  };

  createEventListeners(controller, controller.linkElements);

  return controller;
};
