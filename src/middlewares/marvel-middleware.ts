import { findCharacterByID } from '../services/marvel-service';
import { Context } from 'koa';

export async function getCharacter(ctx: Context) {
  ctx.response.body = await findCharacterByID(1009742);
}