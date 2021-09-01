import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { checkCompatibility } from './checkCompatibility';
import { fetchDocument } from './fetchDocument';
import { renderPage } from './renderPage';
import type { PageTransitionController } from './initialisePageTransitions';
import type { Url } from './types/Url';

export const navigateTo = async (
  controller: PageTransitionController<PageTransitionComponent>,
  url: Url,
  updatePushState = true,
): Promise<void> => {
  await checkCompatibility();

  try {
    const [newDocument] = await Promise.all([
      fetchDocument(url as Url),
      controller.transitionComponent.transitionOut(),
    ]);
    const app = await renderPage(newDocument);

    if (updatePushState) {
      history.pushState(null, newDocument.title, url);
    }

    await controller.resetTransitionComponent();
    controller.transitionComponent.setInBetweenTransition();
    document.title = newDocument.title;
    controller.setCurrentLocation(location.href as Url);
    await app.adopted;
    await controller.transitionComponent.transitionIn();

    if (controller.onNavigationComplete) controller.onNavigationComplete();
  } catch (error) {
    location.replace(url);
    throw error;
  }
};
