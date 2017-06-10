import Koa from 'koa';
import Router from 'koa-router';

import appy from './clients/appy';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = { hello: 'world' };
});

router.get('/rsvps', (ctx) => {
  return appy
    .rsvps()
    .then((data) => {
      const sum = data.reduce((acc, row) => {
        const confirmed = row[4] === 'Y';
        const plus = Number(row[14]);

        if (!confirmed) {
          return acc;
        }

        return acc + plus + 1;
      }, 0);

      console.info(sum); // eslint-disable-line no-console

      ctx.body = data;
    })
    .catch(error => ctx.throw(500, error));
});

app.use(router.routes());

app.listen(3000);
