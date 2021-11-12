import { addEventListener } from 'seng-disposable-event-listener';
import { navigateTo } from './navigateTo';
import {PageTransitionController} from "./types/PageTransitionController";

export const onHistoryChange = async (
  controller: PageTransitionController,
): Promise<void> => {
  if (controller.currentLocation === location.pathname) return;
  await navigateTo(controller, location.href, false);
};

export const createEventListeners = (
  controller: PageTransitionController,
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
