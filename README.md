node tryjson
============
[![tryjson](https://nodei.co/npm/tryjson.png?compact=true)](https://www.npmjs.com/package/tryjson)

[![Build Status](https://travis-ci.org/rsp/node-tryjson.svg?branch=master)](https://travis-ci.org/rsp/node-tryjson)
[![Coverage Status](https://coveralls.io/repos/github/rsp/node-tryjson/badge.svg?branch=master)](https://coveralls.io/github/rsp/node-tryjson?branch=master)

This module works like `JSON.parse` (and in fact it uses `JSON.parse`) but instead of throwing exceptions it returns `undefined` on failure. This is not always a desired behaviour but sometimes it is.

This is still work in progress.

Installation
------------
Install to use in your Node project, updating the dependencies in package.json:
```sh
npm install tryjson --save
```

Examples
--------
Basic usage:

```js
var tryjson = require('tryjson');

console.log(tryjson.parse('{"a":1,"b":2}'));
// { a: 1, b: 2 }

console.log(tryjson.parse('{"a":1,"b":2'));
// undefined
```

Issues
------
For any bug reports or feature requests please
[post an issue on GitHub](https://github.com/rsp/node-tryjson/issues).

Author
------
Rafał Pocztarski - [https://github.com/rsp](https://github.com/rsp)

License
-------
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.
