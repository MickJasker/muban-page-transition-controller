import { addEventListener } from 'seng-disposable-event-listener';
import type { PageTransitionController } from './initialisePageTransitions';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { navigateTo } from './navigateTo';
import type { Url } from './types/Url';

export const onHistoryChange = async (
  controller: PageTransitionController<PageTransitionComponent>
): Promise<void> => {
  if (controller.currentLocation === location.pathname) return;
  await navigateTo(controller, location.href as Url, false);
};

export const createEventListeners = (
  controller: PageTransitionController<PageTransitionComponent>
): void => {
  const { disposableManager } = controller;

  disposableManager.add(addEventListener(window, 'popstate', () => onHistoryChange(controller)));
};
