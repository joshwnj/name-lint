var findit = require('findit');
var path = require('path');
var minimatch = require('minimatch');

function findFirstMatch (blacklist, name) {
  var i;
  for (i=0; i<blacklist.length; i+=1) {
    if (minimatch(name, blacklist[i])) {
      return blacklist[i];
    }
  }
  return null;
}

module.exports = function (dir, opts, callback) {
  var finder = findit(dir);
  var matches = [];

  finder.on('directory', function (dir, stat, stop) {
    var base = path.basename(dir);

    if (dir === '.') { return; }

    // exclude dot-dirs
    if (base[0] === '.') { return stop(); }

    // stop if we reach a directory in the blacklist
    if (findFirstMatch(opts.exclude, dir)) {
      return stop();
    }

    // check format of directories
    if (!opts.dirFormat.test(base)) {
      matches.push(dir);
    }
  });

  finder.on('file', function (file, stat) {
    var ext = path.extname(file);
    var base = path.basename(file, ext);
    var format = opts.fileFormats[ext];

    if (!format) { return; }

    if (!format.test(base)) {
      matches.push(file);
    }
  });

  finder.on('end', function () {
    callback(null, matches);
  });
};
