import {PageTransitionComponent} from "./PageTransitionComponent";
import {DisposableManager} from "seng-disposable-manager";


export interface PageTransitionController<TransitionComponent extends PageTransitionComponent> {
  /**
   * Returns the component instance that is currently used to handle the page transitions
   * */
  transitionComponent: TransitionComponent;
  /**
   * Return the Disposable Manager that manages all disposable events. [Uses the `seng-disposable-manager` library](https://www.npmjs.com/package/seng-disposable-manager)
   * */
  readonly disposableManager: DisposableManager;
  /**
   * Return all link elements that can trigger a page navigation with a transition
   * */
  linkElements: ReadonlyArray<HTMLAnchorElement>;
  /**
   * Return the current url of the page. Only used internally
   * */
  currentLocation: string;
  /**
   * Function that updates the `currentLocation` property.
   * @param url {string} the url of the new location
   * */
  readonly setCurrentLocation: (url: string) => void;
  /**
   * Function that updates the `linkElements` property.
   * > NOTE: This function doesn't disposes and updates the event listeners, use the `updateLinkElements` function for that
   * */
  readonly setLinkElements: (elements: ReadonlyArray<HTMLAnchorElement>) => void;
  /**
   * Function that resets the transition component and reinitialises it after the new DOM is parsed in
   * */
  readonly resetTransitionComponent: () => Promise<void>;
  /**
   * Callback that is triggered when the navigation flow is complete
   * */
  onNavigationComplete?: () => void;
}
