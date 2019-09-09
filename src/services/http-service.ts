import { createHash } from 'crypto';
import axios, { AxiosInstance } from 'axios';

const PUBLIC_KEY: string = '043c990b10d5fbc8e9f82eb64e3c326f';
const PRIVATE_KEY: string = '0b3c2bcf5316bba1619a9430763e7bb3393199cf';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const baseReq: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

function getDefaultParams() {
  const ts: number = new Date().getTime();
  return { 
    ts,
    apikey: PUBLIC_KEY,
    hash: createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex')
  };
}

export async function get(url: string, cParams: any = {}): Promise<any> {
  const params = { 
    ...getDefaultParams(),
    ...cParams
  };

  return baseReq({ method: 'get', url,  params });
}