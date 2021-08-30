import { cleanElement, initComponents } from 'muban-core';
import type { App } from './types/App';
import { getAppComponent } from './util/getElementComponent';

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
