'use strict';

function parse(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return undefined;
    }
}

module.exports = {
    parse: parse,
};
