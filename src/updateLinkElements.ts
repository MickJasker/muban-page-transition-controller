import type { PageTransitionController } from './initialisePageTransitions';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { createEventListeners } from './createEventListeners';

export const updateLinkElements = (
  controller: PageTransitionController<PageTransitionComponent>,
  elements: ReadonlyArray<HTMLAnchorElement>,
): void => {
  const { disposableManager, setLinkElements } = controller;
  disposableManager.dispose();
  setLinkElements(elements);
  createEventListeners(controller, elements);
};
