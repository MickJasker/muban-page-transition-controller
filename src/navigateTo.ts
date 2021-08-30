import type { Url } from './types/Url';
import type { PageTransitionController } from './initialisePageTransitions';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { checkCompatibility } from './checkCompatibility';
import { fetchDocument } from './fetchDocument';
import { renderPage } from './renderPage';

export const navigateTo = async (
  controller: PageTransitionController<PageTransitionComponent>,
  url: Url,
  updatePushState = true,
): Promise<void> => {
  await checkCompatibility();
  const { transitionComponent, onNavigationComplete } = controller;

  try {
    const [newDocument] = await Promise.all([
      fetchDocument(url),
      transitionComponent.transitionOut(),
    ]);
    const app = await renderPage(newDocument);

    if (updatePushState) {
      history.pushState(null, newDocument.title, new URL(url));
    }

    transitionComponent.setInBetweenTransition();
    document.title = newDocument.title;
    controller.setCurrentLocation(location.href as Url);
    await app.adopted;
    await transitionComponent.transitionIn();

    if (onNavigationComplete) onNavigationComplete();
  } catch (error) {
    location.replace(url);
  }
};
