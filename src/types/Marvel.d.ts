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

export type CharacterList = {
    available: number,
    returned: number,
    collectionURI: string,
    items: CharacterSummary[]
}

export type CharacterSummary = {
    resourceURI: string,
    name: string,
    role: string
}

export type Story = {
    id: number,
    title: string,
    description: string,
    resourceURI: string,
    type: string
    modified: Date,
    thumbnail: Image,
    characters: CharacterList,
}

export type StorySummary = {
    resourceURI: string,
    name: string,
    type: string
}

export type StoryList = {
    available: number,
    returned: number,
    collectionURI: number,
    items: StorySummary[]
}

export type Character = {
    id: number,
    name: string,
    description: string,
    modified: Date,
    resourceURI: string,
    urls?: Url[],
    thumbnail: Image,
    comics?: ComicList
};


export type Response = {
    code: number,
    status: string,
    copyright: string,
    attributionText: string,
    attributionHTML: string,
    data: ResponseData, 
}

export type ResponseData = {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: any
}
