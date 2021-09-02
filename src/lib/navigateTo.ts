import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { checkCompatibility } from './checkCompatibility';
import { fetchDocument } from './fetchDocument';
import { renderPage } from './renderPage';
import type { PageTransitionController } from './initialisePageTransitions';

export const navigateTo = async (
  controller: PageTransitionController<PageTransitionComponent>,
  url: string,
  updatePushState = true,
): Promise<void> => {
  await checkCompatibility();

  try {
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

    if (controller.onNavigationComplete) controller.onNavigationComplete();
  } catch (error) {
    location.replace(url);
    throw error;
  }
};
