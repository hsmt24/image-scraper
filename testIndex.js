process.env.TARGET_URL = 'http://localhost/';

console.time('timer');
require("./index").handler({},
  { invokeid: 'invokeid' },
  (err, data) => {
    if (err) return console.error(err);
    if (data) return console.log(data);
    console.timeEnd('timer');
  });
