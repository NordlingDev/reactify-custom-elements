"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCategorizedProps = void 0;
var React = __importStar(require("react"));
var toKebabCase_1 = require("./toKebabCase");
function categorizeProp(key, value) {
    if (key === "children") {
        return "children";
    }
    if (key === "style") {
        return "style";
    }
    if (key !== "className" &&
        (key === "key" ||
            key === "children" ||
            key.startsWith("data-") ||
            key.startsWith("aria-") ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean")) {
        return "attr";
    }
    if (key.startsWith("on") && key[2] === key[2].toUpperCase()) {
        return "event";
    }
    return "prop";
}
function objectHasChanged(a, b) {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return true;
    }
    for (var key in a) {
        if (a[key] !== b[key]) {
            return true;
        }
    }
    return false;
}
var useCategorizedProps = function (elementProps, globalOptions) {
    var _a, _b;
    var attrsRef = React.useRef({});
    var childrenRef = React.useRef();
    var eventsRef = React.useRef({});
    var propsRef = React.useRef({});
    var styleRef = React.useRef({});
    var newAttrs = {};
    var newEvents = {};
    var newProps = {};
    for (var originalKey in elementProps) {
        var key = (_b = (_a = globalOptions.mapKeys) === null || _a === void 0 ? void 0 : _a.call(globalOptions, originalKey)) !== null && _b !== void 0 ? _b : originalKey;
        var value = elementProps[originalKey];
        var category = categorizeProp(key, value);
        if (category === "children") {
            childrenRef.current = value;
        }
        else if (category === "style") {
            styleRef.current = value;
        }
        else if (category === "attr") {
            newAttrs[toKebabCase_1.toKebabCase(key)] = value !== undefined ? "" + value : undefined;
        }
        else if (category === "event") {
            newEvents[key] = typeof value === "function" ? value : undefined;
        }
        else {
            newProps[key] = value !== undefined ? value : undefined;
        }
    }
    if (objectHasChanged(newAttrs, attrsRef.current)) {
        attrsRef.current = newAttrs;
    }
    if (objectHasChanged(newEvents, eventsRef.current)) {
        eventsRef.current = newEvents;
    }
    if (objectHasChanged(newProps, propsRef.current)) {
        propsRef.current = newProps;
    }
    return {
        attrs: attrsRef.current,
        children: childrenRef.current,
        events: eventsRef.current,
        props: propsRef.current,
        style: styleRef.current,
    };
};
exports.useCategorizedProps = useCategorizedProps;
