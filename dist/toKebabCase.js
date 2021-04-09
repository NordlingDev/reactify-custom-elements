"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKebabCase = void 0;
var toKebabCase = function (value) {
    var chars = [];
    for (var i = 0; i < value.length; i++) {
        var char = value[i];
        var charLowerCase = char.toLowerCase();
        if (char !== charLowerCase && i > 0) {
            chars.push("-");
        }
        chars.push(charLowerCase);
    }
    return chars.join("");
};
exports.toKebabCase = toKebabCase;
