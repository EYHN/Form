import Koa from 'koa';
import InjectionMiddlewares from './middlewares';
import logger from './logger';

const app = new Koa();

InjectionMiddlewares(app);

app.listen(process.env.PORT || 3000, () => {
  logger.info('form.app API server start success.')
});
