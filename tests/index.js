var tape = require('tape');
var lint = require('../');

tape('Match files', function (t) {
  var opts = {
    dirFormat: /.*/,
    fileFormats: {
      // only accept files name "test"
      '.txt': /(test)/
    }
  };

  t.plan(1);
  lint(
    __dirname + '/fixtures',
    opts,
    function (err, items) {
      t.equal(items.length, 3, 'Match 3 files');
    });
});

tape('Exclude all directories', function (t) {
  var opts = {
    dirFormat: /.*/,
    exclude: [ '**' ],
    fileFormats: {
      '.txt': /.*/
    }
  };

  t.plan(1);
  lint(
    __dirname + '/fixtures',
    opts,
    function (err, items) {
      t.equal(items.length, 0, 'No matches');
    });
});
