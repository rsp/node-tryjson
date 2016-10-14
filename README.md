node tryjson
============

[![npm install][install-img]][npm-url]
<br>
[![Build Status][travis-img]][travis-url]
[![Dependencies Status][david-img]][david-url]
[![Known Vulnerabilities][snyk-img]][snyk-url]
[![Downloads][downloads-img]][stats-url]
[![License][license-img]][license-url]

[npm-url]: https://www.npmjs.com/package/tryjson
[github-url]: https://github.com/rsp/node-tryjson
[readme-url]: https://github.com/rsp/node-tryjson#readme
[issues-url]: https://github.com/rsp/node-tryjson/issues
[license-url]: https://github.com/rsp/node-tryjson/blob/master/LICENSE.md
[travis-url]: https://travis-ci.org/rsp/node-tryjson
[travis-img]: https://travis-ci.org/rsp/node-tryjson.svg?branch=master
[snyk-url]: https://snyk.io/test/github/rsp/node-tryjson
[snyk-img]: https://snyk.io/test/github/rsp/node-tryjson/badge.svg
[david-url]: https://david-dm.org/rsp/node-tryjson
[david-img]: https://david-dm.org/rsp/node-tryjson/status.svg
[install-img]: https://nodei.co/npm/tryjson.png?compact=true
[downloads-img]: https://img.shields.io/npm/dt/tryjson.svg
[license-img]: https://img.shields.io/npm/l/tryjson.svg
[stats-url]: http://npm-stat.com/charts.html?package=tryjson
[github-follow-url]: https://github.com/rsp
[github-follow-img]: https://img.shields.io/github/followers/rsp.svg?style=social&label=Follow
[twitter-follow-url]: https://twitter.com/intent/follow?screen_name=pocztarski
[twitter-follow-img]: https://img.shields.io/twitter/follow/pocztarski.svg?style=social&label=Follow
[stackoverflow-url]: https://stackoverflow.com/users/613198/rsp
[stackexchange-url]: https://stackexchange.com/users/303952/rsp
[stackexchange-img]: https://stackexchange.com/users/flair/303952.png

Why
---
Not everyone knows that you should **always** run `JSON.parse` inside of the `try/catch` block or otherwise you risk your application crashing on bad input. Most of the examples of using `JSON.parse` that I see online never does that. People usually assume that you will get `undefined` on bad or empty input but you don't.

**Remember: Always `try { JSON.parse() }` or use `tryjson.parse()`**

This module works like many people assume that the built-in `JSON` works and can simplify some common code. People usually write:
```js
object = JSON.parse(string);
```
when they mean:
```js
try {
  object = JSON.parse(string);
} catch (e) {
  object = undefined;
}
```
and now they can write it as:
```js
object = tryjson.parse(string);
```
or even as:
```js
object = JSON.parse(string);
```
if you want to locally override `JSON` with:

```js
var JSON = require('tryjson');
```

How it works
------------
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
