name-lint
====

Check directories and files for naming consistency.

Usage
----

Recommended usage is to create a js file with the preferred naming conventions for your project. See [examples/lower-dash-case.js](./examples/lower-dash-case.js) for an example.

```
lint(dir, options, function (err, matches) {
  // ...
});
```

- `dir`: path of the directory to start from.
- `options`: object containing the following:
 - `dirFormat`: regexp of the expected format for directories
 - `fileFormats`: key-value map of file extensions to expected regexp format (see [examples](./examples/lower-dash-case.js))
 - `exclude`: array of glob patterns (refer to <https://www.npmjs.org/package/minimatch>). When a directory matching one of these is reached we ignore the directory and everything in it.

License
----

MIT
