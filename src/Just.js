"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("./Maybe");
var Just = (function (_super) {
    __extends(Just, _super);
    function Just(theValue) {
        var _this = _super.call(this) || this;
        _this.value = theValue;
        return _this;
    }
    Just.prototype.getOrElse = function (defaultValue) {
        return this.value;
    };
    Just.prototype.map = function (fn) {
        return new Just(fn(this.value));
    };
    Just.prototype.andThen = function (fn) {
        return fn(this.value);
    };
    Just.prototype.cata = function (matcher) {
        return matcher.Just(this.value);
    };
    return Just;
}(Maybe_1.default));
function just(value) { return new Just(value); }
exports.just = just;
exports.default = Just;
