import type ICoreComponent from 'muban-core/lib/interface/ICoreComponent';

export interface App extends ICoreComponent {
  adopted: () => Promise<void>;
}
