import _ from 'lodash';
import randomColor from 'randomcolor';
import Koa from 'koa';
import Router from 'koa-router';

import appy from './clients/appy';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = { hello: 'world' };
});

const RSVP_KEYS = Object.freeze({
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  dietaryRestrictions: 'Dietary restrictions',
  meal: 'Meal',
  group: 'Group'
});

const MEAL_ICONS = Object.freeze({
  Steak: '🐮',
  Vegetarian: '🍆',
  Chicken: '🐔'
});

router.get('/rsvps', (ctx) => {
  return appy
    .rsvps()
    .then((data) => {
      const colors = randomColor({ count: _.max(_.map(data, RSVP_KEYS.group)) });

      const body = data.filter(rsvp => rsvp['RSVP Status'] === 'Y').map((rsvp) => {
        const mealIcons = [];
        const rsvpResponse = {};

        for (const [key, value] of Object.entries(RSVP_KEYS)) {
          rsvpResponse[key] = rsvp[value];
        }

        const { dietaryRestrictions } = rsvpResponse;

        if (dietaryRestrictions.match(/sharing/i)) {
          mealIcons.push(...Object.values(MEAL_ICONS));
        } else {
          mealIcons.push(MEAL_ICONS[rsvpResponse.meal]);
        }

        if (dietaryRestrictions.match(/dairy/i)) mealIcons.push('🥛');
        if (dietaryRestrictions.match(/gluten/i)) mealIcons.push('🌾');

        for (const [meal, icon] of Object.entries(MEAL_ICONS)) {
          if (dietaryRestrictions.match(new RegExp(meal, 'i'))) mealIcons.push(icon);
        }

        rsvpResponse.groupColor = colors[rsvpResponse.group].replace('#', '');
        rsvpResponse.mealIcons = mealIcons.join('');

        return rsvpResponse;
      });


      ctx.body = body;
    })
    .catch(error => ctx.throw(500, error));
});

app.use(router.routes());

app.listen(3000);
