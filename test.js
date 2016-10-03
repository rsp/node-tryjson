'use strict';

var test = require('tape');
var tryjson = require('./index');

test('valid json', function (t) {
    var obj, objs = [
        null,
        '',
        'txt',
        6,
        -0.2,
        1e6,
        1/3,
        [],
        {},
        true,
        false,
        [[[[[1]]]]],
        {a: 1, b: 2},
        ["a", 2, 3, null],
        [{a:1},{b:2},{c:[[3]]}],
    ];
    t.plan(3 * objs.length);
    objs.forEach(function (o) {
        var json = JSON.stringify(o);
        obj = tryjson.parse(json);
        t.equal(typeof o, typeof obj, json + ' should have the same type');
        t.equal(Array.isArray(o), Array.isArray(obj), json + ' should have the same array status');
        t.deepEqual(o, obj, json + ' should be deeply equal');
    });
});

test('invalid json', function (t) {
    var obj, json = [
        'nul',
        "{'a':1,'b':2}",
        '{"a":1,"b"}',
        '["a",2,3,nul]',
        '{a:1,b:2}',
        '[1,2,3',
        '',
    ];
    t.plan(json.length);
    json.forEach(function (s) {
        obj = tryjson.parse(s);
        t.ok(obj === undefined, s + ' should be undefined');
    });
});
