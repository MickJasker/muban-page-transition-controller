import { checkCompatibility } from './checkCompatibility';
import { fetchDocument } from './fetchDocument';
import { renderPage } from './renderPage';
import { PageTransitionController } from './types/PageTransitionController';

/**
 * Programmatically navigate to new route with page transition
 *
 * @param controller {PageTransitionController} Controller instance your application uses for page transitions
 * @param url {string} URL of the new page
 * @param updatePushState {boolean} Optional boolean to determine if the pushState of the history should be updated. Should be be `false` when function is triggered by the `popstate` event. Only usable when `render-mode` is `dynamic`.
 * */
export const navigateTo = async (
  controller: PageTransitionController,
  url: string,
  updatePushState = true,
): Promise<void> => {
  try {
    await checkCompatibility(controller.renderMode);

    if (controller.renderMode === 'dynamic') {
      const oldDocument = document;
      const [newDocument] = await Promise.all([
        fetchDocument(url),
        controller.onBeforeNavigateOut ? controller.onBeforeNavigateOut() : undefined,
      ]);
      await renderPage(newDocument);

      if (updatePushState) {
        history.pushState(null, newDocument.title, url);
      }

      document.title = newDocument.title;
      controller.setCurrentLocation(location.href);
      if (controller.onBeforeNavigateIn) await controller.onBeforeNavigateIn();

      if (controller.onNavigationComplete) controller.onNavigationComplete(newDocument, oldDocument);
    } else {
      if (controller.onBeforeNavigateOut) await controller.onBeforeNavigateOut();
      location.replace(url);
    }
  } catch (error) {
    location.replace(url);
    throw error;
  }
};
