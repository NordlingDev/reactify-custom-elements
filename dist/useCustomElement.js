"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.useCustomElement = void 0;
var React = __importStar(require("react"));
var useCategorizedProps_1 = require("./useCategorizedProps");
var useCustomElement = function (name, elementConstructor, elementProps, options) {
    if (options === void 0) { options = {}; }
    var registryElement = customElements.get(name);
    if (!registryElement) {
        customElements.define(name, elementConstructor);
    }
    else if (registryElement !== elementConstructor) {
        throw new Error("Element with name \"" + name + "\" is already registered.");
    }
    var elementRef = React.useRef(null);
    var initialPropsRef = React.useRef(null);
    var _a = useCategorizedProps_1.useCategorizedProps(elementProps || {}, options), attrs = _a.attrs, children = _a.children, events = _a.events, props = _a.props, style = _a.style;
    // Set initial props so we have access to them when some props are unset
    React.useLayoutEffect(function () {
        var element = elementRef.current;
        if (element && !initialPropsRef.current) {
            var initialProps = {};
            for (var key in props) {
                initialProps[key] = props[key];
            }
            initialPropsRef.current = initialProps;
        }
    }, [elementRef, initialPropsRef, props]);
    // Bind events
    React.useLayoutEffect(function () {
        var element = elementRef.current;
        if (element) {
            // Listen to events
            for (var key in events) {
                var callback = events[key];
                if (callback) {
                    element.addEventListener(key.substring(2).toLowerCase(), callback);
                }
            }
            return function () {
                // Remove events
                for (var key in events) {
                    var callback = events[key];
                    if (callback) {
                        element.removeEventListener(key.toLowerCase(), callback);
                    }
                }
            };
        }
    }, [elementRef, events]);
    // Bind props
    React.useLayoutEffect(function () {
        var element = elementRef.current;
        var initialProps = initialPropsRef.current;
        if (element && initialProps) {
            for (var key in props) {
                var value = props[key];
                element[key] = value !== undefined ? value : initialProps[key];
            }
        }
    }, [elementRef, initialPropsRef, props]);
    return [
        React.createElement(name, __assign(__assign({}, attrs), { style: style, ref: elementRef }), children),
        elementRef
    ];
};
exports.useCustomElement = useCustomElement;
