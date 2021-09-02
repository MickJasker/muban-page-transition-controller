import axios from 'axios';

export const fetchDocument = async (url: string): Promise<Document> => {
  const response = await axios.get<string>(url);
  return new DOMParser().parseFromString(response.data, 'text/html');
};
