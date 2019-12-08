import koa from 'koa';
import frontend from './frontend';
import api from './api';
import cors from './cors';
import logger from './logger';

const InjectionMiddlewares = (app: koa) => {
  app
    .use(logger)
    .use(cors)
    .use(api)
    .use(frontend)
}

export default InjectionMiddlewares;