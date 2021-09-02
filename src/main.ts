import type {
  PageTransitionController,
  PageTransitionOptions,
} from './lib/initialisePageTransitions';
import { initialisePageTransitions } from './lib/initialisePageTransitions';
import { navigateTo } from './lib/navigateTo';
import { updateLinkElements } from './lib/updateLinkElements';
import type { PageTransitionComponent } from './lib/types/PageTransitionComponent';

export { initialisePageTransitions, navigateTo, updateLinkElements };

export type { PageTransitionComponent, PageTransitionController, PageTransitionOptions };
