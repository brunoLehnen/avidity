import * as pugExtension from './pug';
import * as Koa from 'koa';

export function addExtensions (app: Koa) {
    pugExtension.addExtension(app);
}