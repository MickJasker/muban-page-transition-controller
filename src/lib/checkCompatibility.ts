export const checkCompatibility = async (renderMode: 'browser' | 'dynamic'): Promise<void> => {
  if (process.env.NODE_ENV === 'development' && renderMode === 'dynamic')
    throw new Error('Page transitions cannot be run in dev mode');
};
