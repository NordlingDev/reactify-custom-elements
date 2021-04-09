import * as React from "react";

import { NDButtonElement } from "../custom-elements";
import { createComponent } from "../../package";

export interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onPress?: (event: Event & { target: NDButtonElement }) => void;
}

export const Button = createComponent<typeof NDButtonElement, ButtonProps>(
    "nd-button",
    NDButtonElement,
    {
        forwardRef: true,
        mapKeys: (key) => key === "className" ? "test" : key,
    }
);

/*export const Button = React.forwardRef<NDButtonElement, ButtonProps>((props, ref) => {
    const [element, elementRef] = useElement("nd-input", NDButtonElement, props);

    React.useImperativeHandle<NDButtonElement | null, NDButtonElement | null>(
        ref,
        () => elementRef.current,
        [elementRef]
    );

    return element;
});*/
