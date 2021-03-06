export interface PageTransitionOptions {
  /**
   * All link elements that can trigger a page navigation with a transition
   * */
  readonly linkElements: ReadonlyArray<HTMLAnchorElement>;
  /**
   * Callback that is triggered before the navigation is triggered
   * */
  readonly onBeforeNavigateOut?: () => Promise<void> | void;
  /**
   * Callback that is triggered after the page is rendered
   * */
  readonly onBeforeNavigateIn?: () => Promise<void> | void;
  /**
   * Callback that is triggered when the navigation flow is complete
   * */
  readonly onNavigationComplete?: (newDocument: Document, oldDocument?: Document) => void;
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
   * `dynamic` renders the new page in the same DOM without leaving the page. Use with caution as it only replaces the `app-root` in the DOM and doesn't executes advanced external scripts again.
   * */
  readonly renderMode?: 'browser' | 'dynamic';
}
