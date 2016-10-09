node tryjson
============
[![tryjson](https://nodei.co/npm/tryjson.png?compact=true)](https://www.npmjs.com/package/tryjson)

[![Build Status](https://travis-ci.org/rsp/node-tryjson.svg?branch=master)](https://travis-ci.org/rsp/node-tryjson)
[![Coverage Status](https://coveralls.io/repos/github/rsp/node-tryjson/badge.svg?branch=master)](https://coveralls.io/github/rsp/node-tryjson?branch=master)

This module works like `JSON.parse` (and in fact it uses `JSON.parse`) but instead of throwing exceptions it returns `undefined` on failure. This is not always a desired behaviour but sometimes it is.

There is also a `stringify` method that works like `JSON.stringify` but instead of throwing exceptions on circular structures it returns `"null"` - which, again, may not be what you always want but sometime it is and use can use this module to simplify your code in those cases.

Installation
------------
Install to use in your Node project, updating the dependencies in package.json:
```sh
npm install tryjson --save
```

Examples
--------
Basic usage:

Parsing:
```js
var tryjson = require('tryjson');

console.log(tryjson.parse('{"a":1,"b":2}'));
// { a: 1, b: 2 }

console.log(tryjson.parse('{"a":1,"b":2'));
// undefined
```

Stringification:
```js
var tryjson = require('tryjson');

var x = {a: 1};
console.log(tryjson.stringify(x));
// '{"a":1}'
x.b = x;
console.log(tryjson.stringify(x));
// 'null'
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
