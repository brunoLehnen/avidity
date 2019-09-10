import { Context } from 'koa';
import { SessionData } from '../server/session';
import { findCharacterWithSampleStory } from '../services/marvel-service';

export async function getCharacterWithSampleStory(ctx: Context) {
  const sessionData: SessionData = ctx.state;
  const data = await findCharacterWithSampleStory(
    sessionData.selectedCharacterID,
    sessionData.selectedSeriesID,
  );

  ctx.renderDefault(data);
}
