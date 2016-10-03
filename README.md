node tryjson
============
[![tryjson](https://nodei.co/npm/tryjson.png?compact=true)](https://www.npmjs.com/package/tryjson)

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
