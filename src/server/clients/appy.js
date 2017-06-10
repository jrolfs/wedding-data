import request from 'request-promise-native';
import csv from 'csv';
import config from 'config';

const { uri, cookie } = config.get('appy');

function rsvps() {
  return request({ uri, headers: { Cookie: cookie } }).then((response) => {
    return new Promise((resolve, reject) => {
      csv.parse(response, { auto_parse: true }, (error, data) => {
        if (error) return reject(error);

        return resolve(data);
      });
    });
  });
}

export default { rsvps };
