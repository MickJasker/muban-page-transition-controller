import { cleanElement, initComponents } from 'muban-core';
import type { App } from './types/App';
import { getAppComponent } from './util/getElementComponent';

/**
 * Render the new DOM and reinitialise Muban components
 *
 * @param newPage {Document} New document for the new page
 * @param currentPage {Document} Document of the current page. Defaults to `window.document`
 * @return Promise<App> Return the App component of the new page
 * */
export const renderPage = async (
  newPage: Document,
  currentPage: Document = document,
): Promise<App> => {
  const currentAppElement = currentPage.querySelector<HTMLElement>('[data-component="app-root"]');
  const newAppElement = newPage.querySelector<HTMLElement>('[data-component="app-root"]');
  if (!currentAppElement || !newAppElement) throw new Error(`app-root doesn't exist on document`);

  cleanElement(currentAppElement);
  currentAppElement.innerHTML = newAppElement.innerHTML;
  initComponents(currentAppElement);

  return getAppComponent();
};
