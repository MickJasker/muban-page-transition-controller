import { DisposableManager } from 'seng-disposable-manager';
import { checkCompatibility } from './checkCompatibility';
import { createEventListeners } from './createEventListeners';
import { PageTransitionController } from './types/PageTransitionController';
import { PageTransitionOptions } from './types/PageTransitionOptions';

/**
 * Initialise an instance of the `PageTransitionController`
 *
 * @template TransitionComponent extends PageTransitionComponent
 * @param options {PageTransitionOptions} General options for the controller
 * @return Promise<PageTransitionController<TransitionComponent>> Controller instance
 * */
export const initialisePageTransitions = async (
  options: PageTransitionOptions,
): Promise<PageTransitionController> => {
  const disposableManager = new DisposableManager();

  await checkCompatibility(options.renderMode || 'browser');

  const controller: PageTransitionController = {
    disposableManager,
    onNavigationComplete: options.onNavigationComplete,
    onBeforeNavigateIn: options.onBeforeNavigateIn,
    onBeforeNavigateOut: options.onBeforeNavigateOut,
    currentLocation: location.href,
    linkElements: options.linkElements,
    renderMode: options.renderMode || 'browser',
    setCurrentLocation: (url: string) => {
      controller.currentLocation = url;
    },
    setLinkElements: (elements) => {
      controller.linkElements = elements;
    },
  };

  createEventListeners(controller, controller.linkElements);

  if (controller.renderMode === 'browser') {
    if (controller.onBeforeNavigateIn) await controller.onBeforeNavigateIn();
    if (controller.onNavigationComplete) controller.onNavigationComplete(document);
  }

  return controller;
};
