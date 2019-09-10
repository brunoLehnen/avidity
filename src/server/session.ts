import { Context } from 'koa';

export type SessionData = {
    selectedCharacterID: number,
    selectedSeriesID: number,
};

export async function session(ctx: Context, next: () => any) {
    ctx.state = {
        selectedCharacterID: 1009220,
        selectedSeriesID: 16450,
    };

    await next();
}
