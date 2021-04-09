import * as React from "react";

import { RCEOptions } from "./options";
import { useCategorizedProps } from "./useCategorizedProps";

/**
 * A hook that returns an instance of a custom element.
 * @param elementName string
 * @param elementProps Object
 * @param options Object
 * @returns HTMLElement
 */
export const useCustomElement = <E extends HTMLElement = HTMLElement, P extends {} = {}>(
    elementName: string,
    elementProps?: P,
    options: RCEOptions = {}
) : [element: React.ReactElement, ref: React.MutableRefObject<E | null>] => {
    const elementRef = React.useRef<E | null>(null);
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
        React.createElement(elementName, { ...attrs, style, ref: elementRef }, children),
        elementRef
    ];
};
