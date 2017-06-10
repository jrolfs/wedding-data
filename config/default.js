const cookies = require('./cookies.json');

module.exports = {
  appy: {
    uri: 'https://www.appycouple.com/editor/rsvp_csv/?csv_seid=266700',
    cookie: cookies.values.join(' ')
  }
};
