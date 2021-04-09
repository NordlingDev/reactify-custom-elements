import * as React from "react";
import { RCEOptions } from "./options";

import { useCustomElement } from "./useCustomElement";

export const createComponent = <
    ElementConstructor extends typeof HTMLElement,
    ElementProps extends {} = {}
>(
    name: string,
    elementConstructor: ElementConstructor,
    options: RCEOptions = { forwardRef: false }
) => {
    if(options.forwardRef) {
        return React.forwardRef<ElementConstructor["prototype"], ElementProps>((props, ref) => {
            const [element, elementRef] = useCustomElement(name, elementConstructor, props, options);

            React.useImperativeHandle<ElementConstructor["prototype"] | null, ElementConstructor["prototype"] | null>(
                ref,
                () => elementRef.current,
                [elementRef]
            );

            return element;
        });
    }
    
    return (props: ElementProps) => useCustomElement(name, elementConstructor, props, options)[0];
}
