import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import * as path from 'path';
import * as pug from 'pug';
import * as RenderModule from '../../src/server/render';

const DATA = { test: 'test' };
const DEFAULT_TEMPLATE: string = 'default.pug';
const BASE_PATH = path.join(__dirname, '..', '..', 'src', 'views');
const STATE = {};

jest.mock('pug', () => ({
  renderFile: jest.fn(() => 'template'),
}));

describe('Render', () => {
  let ctx: Context;

  beforeEach(async () => {
     ctx = createMockContext();
     await RenderModule.render(ctx, nextMiddleWare);
  });

  const nextMiddleWare = jest.fn(async () => Promise.resolve('executed'));

  it('should add render and renderDefault to the context object', () => {
    expect(ctx).toHaveProperty('render');
    expect(ctx).toHaveProperty('renderDefault');
  });

  it('should render the correct template', () => {
    expect(ctx.renderDefault(DATA)).toEqual('template');
    expect(ctx.render('test.pug', STATE, DATA)).toEqual('template');
  });

  it('should call pug.renderFile with correct paths', () => {
    expect(pug.renderFile)
      .toHaveBeenCalledWith(`${BASE_PATH}/${DEFAULT_TEMPLATE}`, Object.assign({}, STATE, DATA));
    expect(pug.renderFile)
      .toHaveBeenCalledWith(`${BASE_PATH}/test.pug`, Object.assign({}, STATE, DATA));
  });

  it('should call next middleware', () => {
    expect(nextMiddleWare).toHaveBeenCalled();
  });

  it('should bind renderDefault with correct args', () => {
    const testData = { test: 'data' };
    ctx.render = jest.fn(() => 'template');
    ctx.renderDefault(testData);
    expect(ctx.render).toHaveBeenCalledWith(DEFAULT_TEMPLATE, STATE, testData);
  });
});
