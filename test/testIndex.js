process.env.TARGET_URL = 'http://www.jorte.com/';

console.time('timer');
require("../src/index").handler({},
  { invokeid: 'invokeid' },
  (err, data) => {
    if (err) return console.error(err);
    if (data) return console.log(data);
    console.timeEnd('timer');
  });
