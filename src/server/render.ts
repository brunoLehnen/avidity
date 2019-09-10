import * as pug from 'pug';
import * as path from 'path';
import { Context } from 'koa';

const VIEW_DIR: string = 'views';
const DEFAULT_TEMPLATE: string = 'default.pug';

function baseRender(template: string, data: any) {
    this.response.body = pug.renderFile(
        path.join(__dirname, '..', VIEW_DIR, template),
        Object.assign({}, this.state, data)
    );
}

export async function render(ctx: Context, next: Function) {
    ctx.render = baseRender.bind(ctx); 
    ctx.renderDefault = baseRender.bind(ctx, DEFAULT_TEMPLATE); 

    await next();
}
