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
  onNavigationComplete?: (newDocument: Document, oldDocument?: Document) => void;
  /**
   * Callback that is triggered after the page is rendered but before the in transition is triggered
   * */
  onBeforeTransitionIn?: () => Promise<void> | void;
  /**
   * Render mode used.
   *
   * **Browser**
   *
   * `browser` mode is the default value and utilizes the default browser navigation.
   * Slower because the new page fetch can only start until the transition is complete but it's safer to run in environments where advanced external scripts need to be executed.
   *
   * **Dynamic**
   *
   * `dynamic` renders in the new page in the same DOM without leaving the page. Use with caution as it only replaces the `app-root` in the DOM and doesn't executes advanced external scripts again.
   * */
  readonly renderMode: 'browser' | 'dynamic';
}
