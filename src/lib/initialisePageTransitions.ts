import { DisposableManager } from 'seng-disposable-manager';
import { checkCompatibility } from './checkCompatibility';
import { getElementComponent } from './util/getElementComponent';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
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
export const initialisePageTransitions = async <
  TransitionComponent extends PageTransitionComponent,
>(
  options: PageTransitionOptions,
): Promise<PageTransitionController<TransitionComponent>> => {
  const disposableManager = new DisposableManager();

  const transitionComponent = await getElementComponent<TransitionComponent>(
    options.transitionComponentSelector,
  );

  await checkCompatibility();

  const controller: PageTransitionController<TransitionComponent> = {
    transitionComponent,
    disposableManager,
    onNavigationComplete: options.onNavigationComplete,
    onBeforeTransitionIn: options.onBeforeTransitionIn,
    currentLocation: location.href,
    linkElements: options.linkElements,
    renderMode: options.renderMode || 'browser',
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

  if (controller.renderMode === 'browser') {
    if (controller.onBeforeTransitionIn) await controller.onBeforeTransitionIn();
    await transitionComponent.transitionIn();

    if (controller.onNavigationComplete) controller.onNavigationComplete(document);
  }

  return controller;
};
