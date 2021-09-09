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
   * Callback that is triggered when the navigation flow is complete
   * */
  readonly onNavigationComplete: (oldDocument: Document, newDocument: Document) => void;
}
