import axios from 'axios';
import type { Url } from './types/Url';

export const fetchDocument = async (url: Url): Promise<Document> => {
  const response = await axios.get<string>(url);
  return new DOMParser().parseFromString(response.data, 'text/html');
};
