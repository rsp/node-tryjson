'use strict';

function parse(json, fallback) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return fallback;
    }
}

function stringify(object, fallback) {
    try {
        if (object === undefined) throw undefined;
        return JSON.stringify(object);
    } catch (e) {
        return JSON.stringify(fallback === undefined ? null : fallback);
    }
}

module.exports = {
    parse: parse,
    stringify: stringify,
};
