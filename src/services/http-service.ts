import axios, { AxiosInstance } from 'axios';
import { createHash } from 'crypto';

const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } = process.env;
const baseReq: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

function getDefaultParams() {
  const ts: number = new Date().getTime();
  return {
    ts,
    apikey: MARVEL_PUBLIC_KEY,
    hash: createHash('md5').update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY).digest('hex'),
  };
}

export async function get(url: string, cParams: any = {}): Promise<any> {
  const params = {
    ...getDefaultParams(),
    ...cParams,
  };

  return baseReq({ method: 'get', url,  params });
}
