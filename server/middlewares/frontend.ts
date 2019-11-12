import koa from 'koa';
import path from 'path';
import Router from 'koa-router';
import compose from 'koa-compose';
import koastatic from 'koa-static';

const render = require(path.resolve(__dirname, '../../dist/ssr/server/server.js')).render;

const frontend:koa.Middleware = async function (ctx) {
  console.log(ctx.path);
  ctx.body = await render(ctx.path, path.resolve(__dirname, '../../dist/ssr/server/'));
}

var router = new Router();

router.get('*', frontend);

export default compose([
  koastatic(path.resolve(__dirname, '../../dist/ssr/client')),
  router.routes(),
  router.allowedMethods()
]);