import axios from 'axios';

/**
 * Fetch the new DOM from the provided URL
 *
 * @param {URL} url URL of the new page
 * @return Promise<Document> The DOM of the fetched page
 * */
export const fetchDocument = async (url: string): Promise<Document> => {
  const response = await axios.get<string>(url);
  return new DOMParser().parseFromString(response.data, 'text/html');
};
