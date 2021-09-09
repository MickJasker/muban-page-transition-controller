import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { checkCompatibility } from './checkCompatibility';
import { fetchDocument } from './fetchDocument';
import { renderPage } from './renderPage';
import { PageTransitionController } from './types/PageTransitionController';

/**
 * Programmatically navigate to new route with page transition
 *
 * @param controller {PageTransitionController<PageTransitionComponent>} Controller instance your application uses for page transitions
 * @param url {string} URL of the new page
 * @param updatePushState {boolean} Optional boolean to determine if the pushState of the history should be updated. Should be be `false` when function is triggered by the `popstate` event.
 * */
export const navigateTo = async (
  controller: PageTransitionController<PageTransitionComponent>,
  url: string,
  updatePushState = true,
): Promise<void> => {
  await checkCompatibility();

  try {
    const oldDocument = document;
    const [newDocument] = await Promise.all([
      fetchDocument(url),
      controller.transitionComponent.transitionOut(),
    ]);
    const app = await renderPage(newDocument);

    if (updatePushState) {
      history.pushState(null, newDocument.title, url);
    }

    await controller.resetTransitionComponent();
    controller.transitionComponent.setInBetweenTransition();
    document.title = newDocument.title;
    controller.setCurrentLocation(location.href);
    await app.adopted;
    await controller.transitionComponent.transitionIn();

    if (controller.onNavigationComplete) controller.onNavigationComplete(oldDocument, newDocument);
  } catch (error) {
    location.replace(url);
    throw error;
  }
};
