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
var Nothing = (function (_super) {
    __extends(Nothing, _super);
    function Nothing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nothing.prototype.getOrElse = function (defaultValue) {
        return defaultValue;
    };
    Nothing.prototype.map = function (fn) {
        return this;
    };
    Nothing.prototype.andThen = function (fn) {
        return this;
    };
    Nothing.prototype.cata = function (matcher) {
        return matcher.Nothing();
    };
    return Nothing;
}(Maybe_1.default));
exports.Nothing = Nothing;
function nothing() {
    return new Nothing();
}
exports.nothing = nothing;
exports.default = Nothing;
//# sourceMappingURL=Nothing.js.map