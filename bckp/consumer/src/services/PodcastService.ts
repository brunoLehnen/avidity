import { ResponsePodcastData } from 'api_types';

const { BACKEND_URL } = process.env;

function extractID(url: string): string {
  try {
    const parsedURL = new URL(url);
    const matchData = /\/id([0-9]*)$/.exec(parsedURL.pathname);

    if (matchData) {
      return matchData[1];
    }

    throw new Error('ID segment not found');
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.error(e);

    throw new Error('Invalid URL');
  }
}

export async function getPodcastByID(id: string): Promise<ResponsePodcastData> {
  const response = await fetch(`${BACKEND_URL || ''}/podcasts/${id}`);

  if (response.status !== 200) {
    const errorMessge = await response.text();
    throw Error(errorMessge);
  }

  return response.json();
}

export function getPodcastByURL(url: string): Promise<ResponsePodcastData> {
  const id = extractID(url);
  return getPodcastByID(id);
}
