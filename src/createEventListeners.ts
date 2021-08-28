import type { DisposableManager } from 'seng-disposable-manager';
import { addEventListener } from 'seng-disposable-event-listener';
import { navigateTo } from './navigateTo';
import type { PageTransitionController } from './initialisePageTransitions';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import type { Url } from './types/Url';

export const onLinkClick = async (
  event: MouseEvent,
  pageTransitionController: PageTransitionController<PageTransitionComponent>
): Promise<void> => {
  const link = event.target as HTMLAnchorElement;
  const url = new URL(link.href);

  await navigateTo(pageTransitionController, url.href as Url);
};

export const createEventListeners = (
  controller: PageTransitionController<PageTransitionComponent>,
  linkElements: ReadonlyArray<HTMLAnchorElement>
): void => {
  const { disposableManager } = controller;
  linkElements.forEach((link) =>
    disposableManager.add(
      addEventListener(link, 'click', (event: MouseEvent) => onLinkClick(event, controller))
    )
  );
};
