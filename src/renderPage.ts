import { cleanElement, initComponents } from 'muban-core';

export const renderPage = async (
  newPage: Document,
  currentPage: Document = document
): Promise<HTMLElement> => {
  const currentAppElement = currentPage.querySelector<HTMLElement>('[data-component="app-root"]');
  const newAppElement = newPage.querySelector<HTMLElement>('[data-component="app-root"]');
  if (!currentAppElement || !newAppElement) throw new Error(`app-root doesn't exist on document`);

  cleanElement(currentAppElement);
  currentAppElement.innerHTML = newAppElement.innerHTML;
  initComponents(currentAppElement);

  return currentAppElement;
};
