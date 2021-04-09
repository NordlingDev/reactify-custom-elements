import * as React from "react";
import { RCEOptions } from "./options";
export declare const createComponent: <ElementConstructor extends {
    new (): HTMLElement;
    prototype: HTMLElement;
}, ElementProps extends {} = {}>(name: string, elementConstructor: ElementConstructor, options?: RCEOptions) => React.ForwardRefExoticComponent<React.PropsWithoutRef<ElementProps> & React.RefAttributes<ElementConstructor["prototype"]>> | ((props: ElementProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>);
