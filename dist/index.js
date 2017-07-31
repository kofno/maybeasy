"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Just_1 = require("./Just");
exports.Just = Just_1.default;
exports.just = Just_1.just;
var Maybe_1 = require("./Maybe");
exports.Maybe = Maybe_1.default;
var Nothing_1 = require("./Nothing");
exports.Nothing = Nothing_1.default;
exports.nothing = Nothing_1.nothing;
var fromNullable = function (v) {
    if (v) {
        return Just_1.just(v);
    }
    return Nothing_1.nothing();
};
exports.fromNullable = fromNullable;
//# sourceMappingURL=index.js.map