import { Context } from 'koa';
import { InvalidInputError } from '../errors/invalid_input_error';
import { ResourceNotFoundError } from '../errors/resource_not_found_error';
import { getByID } from '../services/podcast_service';

export async function show(ctx: Context): Promise<void> {
  try {
    const itunesData = await getByID(ctx.params.id);
    ctx.response.body = itunesData;
  } catch (e) {
    switch (true) {
      case e instanceof InvalidInputError:
        ctx.throw(e.message, 422);
        break;
      case e instanceof ResourceNotFoundError:
        ctx.throw(e.message, 404);
        break;
    }
  }
}
