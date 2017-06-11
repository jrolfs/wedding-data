const cookies = require('./cookies.json');

module.exports = {
  appy: {
    uris: { export: 'https://www.appycouple.com/editor/rsvp_csv/?id=266720&csv_seid=266720' },
    cookie: cookies.values.join(' ')
  }
};
