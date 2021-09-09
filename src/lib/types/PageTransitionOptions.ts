export interface PageTransitionOptions {
  /**
   * Selector that the page transition component can be found with
   * */
  readonly transitionComponentSelector: string;
  /**
   * All link elements that can trigger a page navigation with a transition
   * */
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
  /**
   * Callback that is triggered after the page is rendered but before the in transition is triggered
   * */
  readonly onBeforeTransitionIn?: () => Promise<void> | void;
  /**
   * Callback that is triggered when the navigation flow is complete
   * */
  readonly onNavigationComplete?: (oldDocument: Document, newDocument: Document) => void;
}
