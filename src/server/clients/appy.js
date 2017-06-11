import request from 'request-promise-native';
import csv from 'csv';
import config from 'config';

const { uris: { export: exportURI }, cookie } = config.get('appy');
const headers = { Cookie: cookie };

function rsvps() {
  return request({ uri: exportURI, headers }).then((response) => {
    return new Promise((resolve, reject) => {
      csv.parse(response, { auto_parse: true }, (error, data) => {
        if (error) return reject(error);

        return resolve(data);
      });
    });
  });
}

export default { rsvps };
