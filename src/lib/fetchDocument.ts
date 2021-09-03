/**
 * Fetch the new DOM from the provided URL
 *
 * @param {URL} url URL of the new page
 * @return Promise<Document> The DOM of the fetched page
 * */
export const fetchDocument = async (url: string): Promise<Document> =>
  new DOMParser()
  .parseFromString((await (await fetch(url)).text()), 'text/html');
