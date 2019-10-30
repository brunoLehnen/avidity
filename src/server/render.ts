import { Context } from 'koa';
import * as path from 'path';
import { renderFile } from 'pug';

const VIEW_DIR: string = 'views';
const DEFAULT_TEMPLATE: string = 'default.pug';

export async function render(ctx: Context, next: () => any) {
    ctx.render = (template: string, state: any, data: any) => {
      return renderFile(
          path.join(__dirname, '..', VIEW_DIR, template),
          Object.assign({}, state, data),
      );
    };

    ctx.renderDefault = (data: any) => ctx.render(DEFAULT_TEMPLATE, ctx.state, data);

    await next();
}

