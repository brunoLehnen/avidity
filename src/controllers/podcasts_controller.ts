import { Context } from "koa";
import { getByURL } from "../services/itunes_service";

export async function show(ctx: Context): Promise<void> {
  const itunesData = await getByURL(ctx.params.id);

  ctx.response.body = itunesData;
}
