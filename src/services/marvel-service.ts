import { Character, CharacterSummary, Story, StorySummary, Response } from '../types/Marvel';
import { get as getRequest } from '../services/http-service';
import { getOrSet, mget } from '../services/redis-service';

function idFromResource(res: string): number {
  return parseInt(res.split('/').slice(-1).pop());
}

export async function findCharacterByID(characterID: number): Promise<Character> {
  const response: Response = (await getRequest(`/characters/${characterID}`)).data;
  const setFn = async () => JSON.stringify(response.data);
  return await getOrSet(`character-${characterID}`, setFn);
}

export async function findStoryByID(storyID: number): Promise<Story> {
  const response: Response = (await getRequest(`/stories/${storyID}`)).data;
  const setFn = async () => JSON.stringify(response.data);
  return await getOrSet(`storyID-${storyID}`, setFn);
}

export async function pickRandomStoryByCharacter(stories: StorySummary[]): Promise<Story> {
  const chosenIndex: number = Math.floor((Math.random() * stories.length) + 0);
  const chosenStory: StorySummary = stories[chosenIndex];
  const id: number = idFromResource(chosenStory.resourceURI);
  return findStoryByID(id);
}

export async function findCharactersByStory(story: Story): Promise<Character[]> {
  const ids: number[] = story.characters.items.map((character: CharacterSummary) => idFromResource(character.resourceURI));
  const characterDict: { [key: number]: Character } = {};
  const cachedCharacters: Character[] = (await mget(...ids)).filter(item => !!item);
  const uncachedIDs: number[] = ids.filter((id) => !cachedCharacters.map((item) => item.id).includes(id));
  const uncachedCharacters: Character[] = await Promise.all(uncachedIDs.map(id => findCharacterByID(id)));
  return [...uncachedCharacters, ...cachedCharacters].sort((a: Character, b: Character) => a.id - b.id);
} 