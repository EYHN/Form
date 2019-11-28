import Koa from 'koa';
import InjectionMiddlewares from './middlewares';

const app = new Koa();

InjectionMiddlewares(app);

app.listen(process.env.PORT || 3000, () => {
  console.log('form.app API server start success.')
});
