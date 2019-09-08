import axios, { AxiosInstance } from 'axios';
import { MarvelCharacter } from '../types/Marvel';

const BASE_URL: string = 'https://gateway.marvel.com/v1/public';

const baseReq: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    params: {
        apiKey: '043c990b10d5fbc8e9f82eb64e3c326f',
    },
  });

export async function getCharacters(): Promise<any> {
   // const characterList: any  = await baseReq({ url: '/characters' });
   console.log('aqui');
}
