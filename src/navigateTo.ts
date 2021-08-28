import type { Url } from './types/Url';
import type { PageTransitionController } from './initialisePageTransitions';
import type { PageTransitionComponent } from './types/PageTransitionComponent';
import { checkCompatibility } from './checkCompatibility';

export const navigateTo = async (
  pageTransitionController: PageTransitionController<PageTransitionComponent>,
  url: Url
): Promise<void> => {
  await checkCompatibility();
  console.log(pageTransitionController, url);
};
