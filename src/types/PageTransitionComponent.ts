import type { CoreComponent } from 'muban-core';

export interface PageTransitionComponent extends CoreComponent {
  transitionIn: () => Promise<void>;
  transitionOut: () => Promise<void>;
  setInBetweenTransition: () => void;
}
