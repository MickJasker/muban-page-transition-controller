import { addEventListener } from 'seng-disposable-event-listener';
import type { PageTransitionController } from './initialisePageTransitions';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { navigateTo } from './navigateTo';

export const onHistoryChange = async (
  controller: PageTransitionController<PageTransitionComponent>,
): Promise<void> => {
  if (controller.currentLocation === location.pathname) return;
  await navigateTo(controller, location.href, false);
};

export const createEventListeners = (
  controller: PageTransitionController<PageTransitionComponent>,
  linkElements: ReadonlyArray<HTMLAnchorElement>,
): void => {
  const { disposableManager } = controller;

  disposableManager.add(addEventListener(window, 'popstate', () => onHistoryChange(controller)));

  linkElements.forEach((link) =>
    addEventListener(link, 'click', async (event: MouseEvent) => {
      if (!link.href) return;
      event.preventDefault();
      await navigateTo(controller, link.href);
    }),
  );
};
