'use strict';

var test = require('tape');
var tryjson = require('./index');

test('parsing valid json', function (t) {
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

test('parsing invalid json', function (t) {
    var obj, json = [
        'nul',
        "{'a':1,'b':2}",
        '{"a":1,"b"}',
        '["a",2,3,nul]',
        '{a:1,b:2}',
        '[1,2,3',
        '',
        JSON,
        0/0
    ], fallback = [
        'no fallback',
        'invalid fallback',
        0,
        null,
        false,
        undefined,
        '',
        {a: 1},
        JSON
    ], invalid = {a: 1};
    invalid.b = invalid;
    t.plan(json.length * fallback.length);
    json.forEach(function (s) {
        fallback.forEach(function (f) {
            if (f === 'no fallback') {
                obj = tryjson.parse(s);
                t.ok(obj === undefined, s + ' should be parsed to undefined');
            } else if (f === 'invalid fallback') {
                obj = tryjson.parse(s, invalid);
                t.ok(obj === undefined, s + ' with invalid fallback should be parsed to undefined');
            } else {
                obj = tryjson.parse(s, f);
                t.ok(obj === f, s + ' should be parsed to fallback');
            }
        });
    });
});

test('strigifying valid objects', function (t) {
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
        var json = tryjson.stringify(o);
        obj = JSON.parse(json);
        t.equal(typeof o, typeof obj, json + ' should have the same type');
        t.equal(Array.isArray(o), Array.isArray(obj), json + ' should have the same array status');
        t.deepEqual(o, obj, json + ' should be deeply equal');
    });
});

test('strigifying invalid objects', function (t) {
    var obj, json, objs = [
        {n: 1},
        {n: 2},
        {n: 3},
        null,
        0/0,
        undefined
    ];
    t.plan(objs.length);
    objs[0].a = objs[0];
    objs[1].a = [[[[[[[[[[objs[2]]]]]]]]]]];
    objs[2].a = {a: {a: {a: {a: {a: objs[1]}}}}};
    objs.forEach(function (s, i) {
        json = tryjson.stringify(s);
        obj = JSON.parse(json);
        t.ok(obj === null, 'object ' + i + ' should be null');
    });
});
