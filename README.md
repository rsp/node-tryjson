node tryjson
============
[![tryjson](https://nodei.co/npm/tryjson.png?compact=true)](https://www.npmjs.com/package/tryjson)

[![Build Status](https://travis-ci.org/rsp/node-tryjson.svg?branch=master)](https://travis-ci.org/rsp/node-tryjson)
[![Coverage Status](https://coveralls.io/repos/github/rsp/node-tryjson/badge.svg?branch=master)](https://coveralls.io/github/rsp/node-tryjson?branch=master)

This module works like `JSON.parse` (and in fact it uses `JSON.parse`) but instead of throwing exceptions it returns `undefined` on failure. This is not always a desired behaviour but sometimes it is.

There is also a `stringify` method that works like `JSON.stringify` but instead of throwing exceptions on circular structures it returns `"null"` - which, again, may not be what you always want but sometime it is and you can use this module to simplify your code in those cases.

Rationale
---------
Why `tryjson.parse` returns `undefined` for invalid JSON? Because a valid JSON can never be parsed to `undefined` so you can test it reliably for that value with `value === undefined` to know if it was invalid.

Why `tryjson.stringify` returns `"null"` for objects that cannot be serialized? Because `"null"` is a valid JSON string so it can always be parsed without errors and is still easy to test for `null` value. Note that this time, getting "null" does not necessarily mean that the object couldn't be serialized because it might have been `null` as well.

Installation
------------
Install to use in your Node project, updating the dependencies in package.json:
```sh
npm install tryjson --save
```

Examples
--------
Basic usage:

### Parsing
```js
var tryjson = require('tryjson');

console.log(tryjson.parse('{"a":1,"b":2}'));
// { a: 1, b: 2 }

console.log(tryjson.parse('{"a":1,"b":2'));
// undefined
```

### Stringification
```js
var tryjson = require('tryjson');

var x = {a: 1};
console.log(tryjson.stringify(x));
// '{"a":1}'
x.b = x;
console.log(tryjson.stringify(x));
// 'null'
```

### Testing returned values
```js
var object = tryjson.parse(string);

if (object === undefined) {
  // the string was invalid JSON
}

if (object == null) {
  // the string was either invalid JSON or "null"
}

if (!object) {
  // the string was either invalid JSON, "null", "false" or "0"
}
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
