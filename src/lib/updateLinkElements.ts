import type { PageTransitionController } from './initialisePageTransitions';
import { createEventListeners } from './createEventListeners';
import type { PageTransitionComponent } from './types/PageTransitionComponent';

export const updateLinkElements = (
  controller: PageTransitionController<PageTransitionComponent>,
  elements: ReadonlyArray<HTMLAnchorElement>,
): void => {
  const { disposableManager, setLinkElements } = controller;
  disposableManager.dispose();
  setLinkElements(elements);
  createEventListeners(controller, elements);
};
