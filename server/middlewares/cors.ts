import koa from 'koa';

export default async function cors(ctx: koa.Context, next: () => Promise<any>) {
  try {
    await next();
  } finally {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'x-signature, Content-Type');
  }
}