import mount from 'koa-mount';
import compose from 'koa-compose';
import form from './form';
import response from './response';

export default mount('/api', compose([form, response]));
