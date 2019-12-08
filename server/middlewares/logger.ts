import koa from 'koa';
import pinoHttp from 'pino-http';

const wrap = pinoHttp();
export default async function logger(ctx: koa.Context, next: () => Promise<any>) {
  try {
    wrap(ctx.req, ctx.res);
    ctx.log = ctx.req.log;
    await next();
  } catch (e) {
    ctx.res.err = e;
    throw e
  }
}