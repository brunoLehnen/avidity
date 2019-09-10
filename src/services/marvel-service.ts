import { get as getRequest } from '../services/http-service';
import { getOrSet, mget } from '../services/redis-service';
import { Character, CharacterSummary, CharacterWithSampleStory, Response, Story } from '../types/marvel-service';

function idFromResource(res: string): number {
  return parseInt(res.split('/').slice(-1).pop(), 10);
}

async function pickRandomStoryByCharacter(characterID: number, seriesID: number): Promise<Story> {
  return JSON.parse(await getOrSet('selectedStory', async () => {
    const stories: Story[] = await findStories({ limit: 20, series: seriesID, characters: characterID  });
    const chosenIndex: number = Math.floor((Math.random() * stories.length) + 0);
    return JSON.stringify(stories[chosenIndex]);
  }, 3600));
}

async function findCharacterByID(characterID: number): Promise<Character> {
  return JSON.parse(await getOrSet(`character-${characterID}`, async () => {
    const response: Response = (await getRequest(`/characters/${characterID}`)).data;
    const character: Character = {
      ...response.data.results.pop(),
      attributionText: response.attributionText,
    };

    return JSON.stringify(character);
  }, 604800));
}

async function findStories(filters: any): Promise<Story[]> {
    const response: Response = (await getRequest(`/stories`, filters)).data;
    return response.data.results.map((s: Story) => ({ ...s }));
}

async function findCharactersByStory(story: Story): Promise<Character[]> {
  const ids: number[] = story.characters.items
    .map((character: CharacterSummary) => idFromResource(character.resourceURI));
  const getCharacterKeys = () => ids.map((id) => `character-${id}`);
  const cachedCharacters: Character[] = (await mget(...getCharacterKeys()))
    .filter((item) => !!item)
    .map((c) => JSON.parse(c));
  const uncachedIDs: number[] = ids.filter((id) => !cachedCharacters.map((item) => item.id).includes(id));
  const uncachedCharacters: Character[] = await Promise.all(uncachedIDs.map((id) => findCharacterByID(id)));
  return [...uncachedCharacters, ...cachedCharacters].sort((a: Character, b: Character) => a.id - b.id);
}

export async function findCharacterWithSampleStory(characterID: number, seriesID: number)
: Promise<CharacterWithSampleStory> {
   const mainCharacter = await findCharacterByID(characterID);
   const story = await pickRandomStoryByCharacter(characterID, seriesID);
   const characters = await findCharactersByStory(story);
   return { story, characters, mainCharacter };
}
