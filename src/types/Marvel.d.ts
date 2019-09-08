export type Url = {
    type: string,
    url: string
};

export type Image = {
    path: string,
    extension: string
};

export type ComicSummary = {
    resourceURI: string,
    name: string
};

export type ComicList = {
    available: number,
    returned: number,
    collectionURI: string,
    items: ComicSummary[]
};

export type MarvelCharacter = {
    id: number,
    name: string,
    description: string,
    modified: Date,
    resourceURI: string,
    urls?: Url[],
    thumbnail: Image,
    comics?: ComicList
};