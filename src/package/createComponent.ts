import * as React from "react";
import { BaseOptions } from "./options";

import { useCustomElement } from "./useCustomElement";

export interface CreateComponentOptions extends BaseOptions {
    forwardRef?: boolean;
}

/**
 * Creates a wrapper component for a custom element.
 * @param elementName string
 * @param options Object
 * @returns React.ForwardRefExoticComponent | (props: P) => React.Element
 */
export const createComponent = <E extends HTMLElement = HTMLElement, P extends {} = {}>(
    elementName: string,
    options: CreateComponentOptions = { forwardRef: false }
) => {
    if(options.forwardRef) {
        return React.forwardRef<E, P>((props, ref) => {
            const [element, elementRef] = useCustomElement<E, P>(elementName, props, options);

            React.useImperativeHandle<E | null, E | null>(
                ref,
                () => elementRef.current,
                [elementRef]
            );

            return element;
        });
    }
    
    return (props: P) => useCustomElement(elementName, props, options)[0];
}
