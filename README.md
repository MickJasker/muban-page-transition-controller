# Muban Page Transition Controller

This library enables you to add page transitions to a Muban project

## Getting Started

### Installing
```bash
yarn add muban-page-transition-controller
```

### Create a PageTransitionComponent
The controller needs you to supply a component that will display the animations.

To be a `PageTransitionComponent` your component needs to implement the `PageTransitionComponent` interface, for example:
```typescript
import { CoreComponent } from 'muban-core';
import { PageTransitionComponent } from 'muban-page-transition-controller';

export default class TransitionComponent extends CoreComponent implements PageTransitionComponent {
  public static readonly displayName: string = 'transition-component';

  public transitionIn(): Promise<void> {
    return new Promise(resolve => {
      // add your animation code here
    });
  }

  public transitionOut(): Promise<void> {
    return new Promise(resolve => {
      // add your animation code here
    });
  }

  public setInBetweenTransition(): void {
    // add your animation code here
  }

  public dispose() {
    super.dispose();
  }
}
```

### Init in App component
To initialise the component in your project you first have to create a variable that can contain the controller.

>IMPORTANT: Do not add the controller variable as property to `App` component class

Use a `let` instead outside your class because the `App` component gets reinitialised when your new page is rendered, this can lead to a duplication of event listeners which can result into unexpected behaviour.

Set the value as `null` because the controller needs to be initialised asynchronous.

Example:
 
 ```typescript
import { PageTransitionController } from 'muban-page-transition-controller';
import AbstractComponent from '../../AbstractComponent';
import TransitionComponent from '../../general/transition-component/TransitionComponent';

export let pageTransitionController: PageTransitionController<TransitionComponent> | null = null;

export default class App extends AbstractComponent {
  public static readonly displayName: string = 'app-root';

  // eslint-disable-next-line no-useless-constructor
  public constructor(element: HTMLElement) {
    super(element);

    // for generic app logic
  }

  public dispose() {
    // clean up stuff when hot reloading
    super.dispose();
  }
}
```

With the variable in place we can use the `initialisePageTransitions` function.
Do this in an `async adopted` function on your `App` class, for example:

```typescript
import {
  initialisePageTransitions,
  PageTransitionController,
} from 'muban-page-transition-controller';
import AbstractComponent from '../../AbstractComponent';
import TransitionComponent from '../../general/transition-component/TransitionComponent';

export let pageTransitionController: PageTransitionController<TransitionComponent> | null = null;

export default class App extends AbstractComponent {
  public static readonly displayName: string = 'app-root';

  // eslint-disable-next-line no-useless-constructor
  public constructor(element: HTMLElement) {
    super(element);

    // for generic app logic
  }

  public async adopted(): Promise<void> {
    if (!pageTransitionController) {
      pageTransitionController = await initialisePageTransitions<TransitionComponent>({
        linkElements: this.getElements<HTMLAnchorElement>('a'),
        transitionComponentSelector: `[data-component="${TransitionComponent.displayName}"]`,
      });
    }
  }

  public dispose() {
    // clean up stuff when hot reloading
    super.dispose();
  }
}
```

The `initialisePageTransitions` function expects the following options: 

| key                           | description                                                                                      | type                       | required |
|-------------------------------|--------------------------------------------------------------------------------------------------|----------------------------|----------|
| `transitionComponentSelector` | The selector that you use for your `PageTransitionComponent`                                     | `string`                   | `true`   |
| `linkElements`                | The link elements that you want the page transition to trigger on                                | `Array<HTMLAnchorElement>` | `true`   |
| `onNavigationComplete`        | A callback that triggers when the navigation to a new page is finished, including the animations | `function`                 | `false`  |

### Updating link elements
Because the DOM has changed when you navigated to a new page you need to update the supplied link elements to the new links on the page.
Utilize the `onNavigationComplete` for this and the `updateLinkElements` function which accepts the controller and the new linkElements as an argument, for example:
```typescript
import {
  initialisePageTransitions,
  PageTransitionController,
  updateLinkElements,
} from 'muban-page-transition-controller';
import AbstractComponent from '../../AbstractComponent';
import TransitionComponent from '../../general/transition-component/TransitionComponent';

export let pageTransitionController: PageTransitionController<TransitionComponent> | null = null;

export default class App extends AbstractComponent {
  public static readonly displayName: string = 'app-root';

  // eslint-disable-next-line no-useless-constructor
  public constructor(element: HTMLElement) {
    super(element);

    // for generic app logic
  }

  public async adopted(): Promise<void> {
    if (!pageTransitionController) {
      pageTransitionController = await initialisePageTransitions<TransitionComponent>({
        linkElements: this.getElements<HTMLAnchorElement>('a'),
        transitionComponentSelector: `[data-component="${TransitionComponent.displayName}"]`,
        onNavigationComplete: () => {
          if (!pageTransitionController) return;
          updateLinkElements(pageTransitionController, this.getElements<HTMLAnchorElement>('a'));
        },
      });
    }
  }

  public dispose() {
    // clean up stuff when hot reloading
    super.dispose();
  }
}
```

## Programmatically navigate to another page
You can also programmatically to another page using the `navigateTo` function.

The function expects the following arguments:

| argument          | description                                                                                                                                                                                                                            | type                       | required | default |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|----------|---------|
| `controller`      | The controller you currently use in your application                                                                                                                                                                                   | `PageTransitionController` | `true`   |         |
| `url`             | The new url you want to navigate to                                                                                                                                                                                                    | `url` (`string`)           | `true`   |         |
| `updatePushState` | Update the history of the browser session. Will update the page URL and allow navigation with back/forward button. IMPORTANT: only supply `false` if you know what you are doing, in most cases it will break user expected behaviour. | `boolean`                  | `false`  | `true`  |

## Disposing the controller
If you don't need your controller anymore it's important to dispose it, this will remove all active event listeners.
```typescript
pageTransitionController.disposableManager.dispose();
pageTransitionController = null;
```
