import * as React from "react";

import { BaseOptions } from "./options";
import { toKebabCase } from "./toKebabCase";

type Attrs = Record<string, string | undefined>;
type Events = Record<string, ((...args: any[]) => any) | undefined>;
type Props = Record<string, any>;
type Style = React.CSSProperties;

function categorizeProp(key: string, value: any) : "attr" | "children" | "event" | "prop" | "style" {
    if(key === "children") {
        return "children";
    }
    
    if(key === "style") {
        return "style";
    }
    
    if(
        key !== "className" &&
        (
            key === "key" ||
            key === "children" ||
            key.startsWith("data-") ||
            key.startsWith("aria-") ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        )
    ) {
        return "attr";
    }
    
    if(key.startsWith("on") && key[2] === key[2].toUpperCase()) {
        return "event";
    }

    return "prop";
}

function objectHasChanged<T extends {}>(a: T, b: T) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if(keysA.length !== keysB.length) {
        return true;
    }

    for(const key in a) {
        if(a[key] !== b[key]) {
            return true;
        }
    }

    return false;
}

export const useCategorizedProps = <P extends Props>(elementProps: P, baseOptions: BaseOptions) => {
    const attrsRef = React.useRef<Attrs>({});
    const childrenRef = React.useRef<any>();
    const eventsRef = React.useRef<Events>({});
    const propsRef = React.useRef<Props>({});
    const styleRef = React.useRef<Style>({});
    const newAttrs: Attrs = {};
    const newEvents: Events = {};
    const newProps: Props = {};

    for(const originalKey in elementProps) {
        const key = baseOptions.mapPropName?.(originalKey) ?? originalKey;
        const value = elementProps[originalKey];
        const category = categorizeProp(key, value);
        
        if(category === "children") {
            childrenRef.current = value;
        } else if(category === "style") {
            styleRef.current = value;
        } else if(category === "attr") {
            newAttrs[toKebabCase(key)] = value !== undefined ? "" + value : undefined;
        } else if(category === "event") {
            newEvents[key] = typeof value === "function" ? value : undefined;
        } else {
            newProps[key] = value !== undefined ? value : undefined;
        }
    }
    
    if(objectHasChanged(newAttrs, attrsRef.current)) {
        attrsRef.current = newAttrs;
    }
    
    if(objectHasChanged(newEvents, eventsRef.current)) {
        eventsRef.current = newEvents;
    }

    if(objectHasChanged(newProps, propsRef.current)) {
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
