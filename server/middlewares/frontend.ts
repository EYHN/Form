import koa from 'koa';
import path from 'path';
import Router from 'koa-router';
import compose from 'koa-compose';
import koastatic from 'koa-static';

const render = require(path.resolve(process.cwd(), 'dist/ssr/server/server.js')).render;

const frontend:koa.Middleware = async function (ctx) {
  ctx.body = await render(ctx.path, path.resolve(process.cwd(), 'dist/ssr/server/'));
}

var router = new Router();

router.get('*', frontend);

export default compose([
  koastatic(path.resolve(process.cwd(), 'dist/ssr/client')),
  router.routes(),
  router.allowedMethods()
]);
