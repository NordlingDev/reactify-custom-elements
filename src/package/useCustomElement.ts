import * as React from "react";

import { RCEOptions } from "./options";
import { useCategorizedProps } from "./useCategorizedProps";

export const useCustomElement = <
    ElementConstructor extends typeof HTMLElement,
    ElementProps extends {} = {}
>(
    name: string,
    elementConstructor: ElementConstructor,
    elementProps?: ElementProps,
    options: RCEOptions = {}
) : [element: React.ReactElement, ref: React.MutableRefObject<ElementConstructor["prototype"] | null>] => {
    const registryElement = customElements.get(name);

    if(!registryElement) {
        customElements.define(name, elementConstructor);
    } else if(registryElement !== elementConstructor) {
        throw new Error(`Element with name "${name}" is already registered.`);
    }

    const elementRef = React.useRef<ElementConstructor["prototype"] | null>(null);
    const initialPropsRef = React.useRef<Record<string, unknown> | null>(null);
    const { attrs, children, events, props, style } = useCategorizedProps(elementProps || {}, options);

    // Set initial props so we have access to them when some props are unset
    React.useLayoutEffect(() => {
        const element = elementRef.current;

        if(element && !initialPropsRef.current) {
            const initialProps: Record<string, unknown> = {};

            for(const key in props) {
                initialProps[key] = props[key];
            }

            initialPropsRef.current = initialProps;
        }
    }, [elementRef, initialPropsRef, props]);

    // Bind events
    React.useLayoutEffect(() => {
        const element = elementRef.current;

        if(element) {
            // Listen to events
            for(const key in events) {
                const callback = events[key];

                if(callback) {
                    element.addEventListener(key.substring(2).toLowerCase(), callback);
                }
            }

            return () => {
                // Remove events
                for(const key in events) {
                    const callback = events[key];

                    if(callback) {
                        element.removeEventListener(key.toLowerCase(), callback);
                    }
                }
            }
        }
    }, [elementRef, events]);

    // Bind props
    React.useLayoutEffect(() => {
        const element = elementRef.current;
        const initialProps = initialPropsRef.current;

        if(element && initialProps) {
            for(const key in props) {
                const value = props[key];
                (element as any)[key] = value !== undefined ? value : initialProps[key];
            }
        }
    }, [elementRef, initialPropsRef, props]);

    return [
        React.createElement(name, { ...attrs, style, ref: elementRef }, children),
        elementRef
    ];
};
