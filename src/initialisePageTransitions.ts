import { DisposableManager } from 'seng-disposable-manager';
import type { ElementSelector } from './types/ElementSelector';
import { checkCompatibility } from './checkCompatibility';
import { getElementComponent } from './util/getElementComponent';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { createEventListeners } from './createEventListeners';
import type { Url } from './types/Url';

export interface PageTransitionOptions {
  transitionComponentSelector: ElementSelector;
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
}

export interface PageTransitionController<TransitionComponent extends PageTransitionComponent> {
  options: PageTransitionOptions;
  transitionComponent: TransitionComponent;
  disposableManager: DisposableManager;
  currentLocation: Url;
  setCurrentLocation: (url: Url) => void;
}

export const initialisePageTransitions = async <
  TransitionComponent extends PageTransitionComponent
>(
  options: PageTransitionOptions
): Promise<PageTransitionController<TransitionComponent>> => {
  const disposableManager = new DisposableManager();

  await checkCompatibility();

  const transitionComponent = await getElementComponent<TransitionComponent>(
    options.transitionComponentSelector
  );

  const controller: PageTransitionController<TransitionComponent> = {
    options,
    transitionComponent,
    disposableManager,
    currentLocation: location.href as Url,
    setCurrentLocation: (url: Url) => {
      controller.currentLocation = url;
    },
  };

  createEventListeners(controller);

  return controller;
};
