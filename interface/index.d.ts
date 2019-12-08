import { Logger } from 'pino';

declare module 'koa' {
  interface ExtendableContext {
      log: Logger;
  }
}
