import {PageTransitionController} from "./types/PageTransitionController";
import { createEventListeners } from './createEventListeners';
import type { PageTransitionComponent } from './types/PageTransitionComponent';

/**
 * Update the link elements in the provided controller, dispose events on the old links and create new event listeners. Use this function after the DOM changes, for example, after you navigate to new page.
 *
 * @param controller {PageTransitionController<PageTransitionComponent>} Controller instance your application uses for page transitions
 * @param elements {ReadonlyArray<HTMLAnchorElement>} New link elements you want to use to trigger page transitions
 * */
export const updateLinkElements = (
  controller: PageTransitionController<PageTransitionComponent>,
  elements: ReadonlyArray<HTMLAnchorElement>,
): void => {
  const { disposableManager, setLinkElements } = controller;
  disposableManager.dispose();
  setLinkElements(elements);
  createEventListeners(controller, elements);
};
