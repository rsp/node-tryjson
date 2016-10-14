'use strict';

function parse(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return undefined;
    }
}

function stringify(object) {
    try {
        if (object === undefined) throw undefined;
        return JSON.stringify(object);
    } catch (e) {
        return "null";
    }
}

module.exports = {
    parse: parse,
    stringify: stringify,
};
