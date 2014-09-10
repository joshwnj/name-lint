var lint = require('..');
var lowerSnakeCase = /^[a-z0-9\-]+$/;
var opts = {};

// we want directories to use lower-snake-case
opts.dirFormat = lowerSnakeCase;

opts.fileFormats = {
    // and js / html files as well
    '.js': lowerSnakeCase,
    '.html': lowerSnakeCase,

    // scss files sometimes start with an underscore to indicate a mixin
    '.scss': /^_?[a-z0-9\-]+$/
};

// exclude directories / files that match anything in this list
// (uses https://www.npmjs.org/package/minimatch)
opts.exclude = [
    '**/node_modules',
    '**/build'
];

var dir = process.argv[2] || '.';
lint(dir, opts, function (err, matches) {
    if (err) { throw err; }

    console.log(matches.join('\n'));
});
