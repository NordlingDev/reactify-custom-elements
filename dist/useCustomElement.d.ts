import * as React from "react";
import { RCEOptions } from "./options";
export declare const useCustomElement: <ElementConstructor extends {
    new (): HTMLElement;
    prototype: HTMLElement;
}, ElementProps extends {} = {}>(name: string, elementConstructor: ElementConstructor, elementProps?: ElementProps | undefined, options?: RCEOptions) => [element: React.ReactElement<any, string | React.JSXElementConstructor<any>>, ref: React.MutableRefObject<ElementConstructor["prototype"] | null>];
