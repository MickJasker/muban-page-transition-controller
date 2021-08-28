import { DisposableManager } from 'seng-disposable-manager';
import type { ElementSelector } from './types/ElementSelector';
import { checkCompatibility } from './checkCompatibility';
import { getElementComponent } from './util/getElementComponent';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { createEventListeners } from './createEventListeners';

export interface PageTransitionOptions {
  transitionComponentSelector: ElementSelector;
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
}

export interface PageTransitionController<TransitionComponent extends PageTransitionComponent> {
  readonly options: PageTransitionOptions;
  readonly transitionComponent: TransitionComponent;
  readonly disposableManager: DisposableManager;
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

  const controller = {
    options,
    transitionComponent,
    disposableManager,
  };

  createEventListeners(controller, options.linkElements);

  return controller;
};
