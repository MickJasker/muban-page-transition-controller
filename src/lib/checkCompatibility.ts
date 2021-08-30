export const checkCompatibility = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development')
    throw new Error('Page transitions cannot be run in dev mode');
};
