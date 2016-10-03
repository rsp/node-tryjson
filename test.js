'use strict';

var test = require('tape');
var tryjson = require('.');

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
        obj = tryjson.parse(JSON.stringify(o));
        t.equal(typeof o, typeof obj, 'should have the same type');
        t.equal(Array.isArray(o), Array.isArray(obj), 'should have the same array status');
        t.deepEqual(o, obj, 'should be deeply equal');
    });
});

test('invalid json', function (t) {
    var obj, json = [
        '{"a":1,"b"}',
        '["a",2,3,nul]',
        '{a:1,b:2}',
        '[1,2,3',
        '',
    ];
    t.plan(json.length);
    json.forEach(function (s) {
        obj = tryjson.parse(s);
        t.ok(obj === undefined, 'should be undefined');
    });
});