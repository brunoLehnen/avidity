import * as Koa from 'koa';
import * as pug from 'pug';
import * as path from 'path';

const VIEW_DIR: string = 'views';
const TEMPLATE: string = 'default';

export function addExtension(app: Koa) {
    app.context.render = (data: any) => {
        this.body = pug.renderFile(
            path.join(__dirname, '..', VIEW_DIR, TEMPLATE),
            Object.assign({}, this.state, data)
        );
    };
}
