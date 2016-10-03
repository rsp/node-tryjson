'use strict';

var test = require('tape');
var tryjson = require('.');

test('valid json', function (t) {
    var obj, json = [
        '{"a":1,"b":2}',
        '["a",2,3,null]'
    ];
    t.plan(4);
    obj = tryjson.parse(json[0]);
    t.equal(typeof obj, 'object', 'should be object');
    t.deepEqual(obj, JSON.parse(json[0]), 'should return correct data');
    obj = tryjson.parse(json[1]);
    t.ok(Array.isArray(obj), 'should be array');
    t.deepEqual(obj, JSON.parse(json[1]), 'should return correct data');
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