import * as React from "react";
import { RCEOptions } from "./options";
declare type Attrs = Record<string, string | undefined>;
declare type Events = Record<string, ((...args: any[]) => any) | undefined>;
declare type Props = Record<string, any>;
export declare const useCategorizedProps: <P extends Props>(elementProps: P, globalOptions: RCEOptions) => {
    attrs: Attrs;
    children: any;
    events: Events;
    props: Props;
    style: React.CSSProperties;
};
export {};
