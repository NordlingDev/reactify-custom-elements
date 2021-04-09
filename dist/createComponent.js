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
exports.createComponent = void 0;
var React = __importStar(require("react"));
var useCustomElement_1 = require("./useCustomElement");
var createComponent = function (name, elementConstructor, options) {
    if (options === void 0) { options = { forwardRef: false }; }
    if (options.forwardRef) {
        return React.forwardRef(function (props, ref) {
            var _a = useCustomElement_1.useCustomElement(name, elementConstructor, props, options), element = _a[0], elementRef = _a[1];
            React.useImperativeHandle(ref, function () { return elementRef.current; }, [elementRef]);
            return element;
        });
    }
    return function (props) { return useCustomElement_1.useCustomElement(name, elementConstructor, props, options)[0]; };
};
exports.createComponent = createComponent;
