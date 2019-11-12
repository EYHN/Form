import koa from 'koa';
import frontend from './frontend';
import api from './api';
import cors from './cors';


const InjectionMiddlewares = (app: koa) => {
  app
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.log(err.stack)
        ctx.body = err.stack;
        ctx.status = err.status || 500;
      }
    })
    .use(cors)
    .use(api)
    .use(frontend)
}

export default InjectionMiddlewares;