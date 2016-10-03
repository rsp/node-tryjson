'use strict';

function parse(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return undefined;
    }
}

function x() { 1; }

module.exports = {
    parse: parse,
};
