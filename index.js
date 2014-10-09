var findit = require('findit');
var path = require('path');
var minimatch = require('minimatch');

/*

Checking files and directories
====

Recursively steps into all directories in the project, checking the names of files and directories.

If a directory is reached that is excluded, no files or subdirectories within that path are checked.

*/

/*

Finding the first matching pattern in a blacklist
----

Inputs:
- blacklist: regexp[]
- name: string

Output: regexp | null

*/
function findFirstMatch (blacklist, name) {
  var i;
  for (i=0; i<blacklist.length; i+=1) {
    if (minimatch(name, blacklist[i])) {
      return blacklist[i];
    }
  }
  return null;
}

/*

Module interface
----

See [[Example]]

Options:
- exclude: string[] (blacklist of directories)
- dirFormat: regexp (pattern that directory names must match)
- fileFormat: object (each key is a file extension, and the value is the pattern those files must match)

Inputs:
- dir: string
- opts: Options
- callback: function (Error | null, string[])

*/
module.exports = function (dir, opts, callback) {
  var finder = findit(dir);
  var matches = [];

  if (!opts.exclude) { opts.exclude = []; }

  finder.on('directory', function (dir, stat, stop) {
    var base = path.basename(dir);

    if (dir === '.') { return; }

    //> exclude dot-dirs
    if (base[0] === '.') { return stop(); }

    //> stop if we reach a directory in the blacklist
    if (findFirstMatch(opts.exclude, dir)) {
      return stop();
    }

    //> check the directory name
    if (!opts.dirFormat.test(base)) {
      matches.push(dir);
    }
  });

  finder.on('file', function (file, stat) {
    var ext = path.extname(file);
    var base = path.basename(file, ext);
    var format = opts.fileFormats[ext];

    //> ignore files if we don't have a format defined for that extension
    if (!format) { return; }

    //> check the filename
    if (!format.test(base)) {
      matches.push(file);
    }
  });

  finder.on('end', function () {
    callback(null, matches);
  });
};
