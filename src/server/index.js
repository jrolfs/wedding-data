import Koa from 'koa';
import Router from 'koa-router';
import request from 'request-promise-native';
import csv from 'csv';
import config from 'config';

const app = new Koa();
const router = new Router();

const { uri, cookie } = config.get('appy');

app.use(router.routes());

router.get('/', (ctx) => {
  ctx.body = { foo: 'world' };
});

router.get('/rsvps', (ctx) => {
  return request({ uri, headers: { Cookie: cookie } })
    .then((response) => {
      return new Promise((resolve, reject) => {
        csv.parse(response, { auto_parse: true }, (error, data) => {
          if (error) return reject(error);

          return resolve(data);
        });
      });
    })
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

app.listen(3000);
