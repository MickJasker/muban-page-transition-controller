import { getComponentForElement } from 'muban-core';
import type ICoreComponent from 'muban-core/lib/interface/ICoreComponent';
import type { App } from '../types/App';

export const loadComponent = <Component extends ICoreComponent>(
  element: HTMLElement,
): Promise<Component> =>
  new Promise<Component>((resolve, reject) => {
    const component = getComponentForElement<Component>(element);
    if (component) {
      resolve(component);
    } else {
      reject(new Error('Element has no component'));
    }
  });

export const getElementComponent = <Component extends ICoreComponent>(
  selector: string,
  container?: HTMLElement,
): Promise<Component> => {
  let element: HTMLElement | null;

  if (container) {
    element = container.querySelector<HTMLElement>(selector);
  } else {
    // eslint-disable-next-line no-restricted-properties
    element = document.querySelector<HTMLElement>(selector);
  }

  if (!element) throw new Error('Element cannot be found');
  return loadComponent<Component>(element);
};

export function getAppComponent(): Promise<App> {
  return getElementComponent<App>(`[data-component="app-root"]`);
}

export default getElementComponent;
