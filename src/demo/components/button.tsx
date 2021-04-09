import * as React from "react";

import { NDButtonElement } from "../custom-elements";
import { createComponent } from "../../package";

export interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onPress?: (event: Event & { target: NDButtonElement }) => void;
}

window.customElements.define("nd-button", NDButtonElement);

export const Button = createComponent<NDButtonElement, ButtonProps>("nd-button", {
    forwardRef: true,
    // mapPropName: (key) => key === "className" ? "test" : key,
});

/*export const Button = React.forwardRef<NDButtonElement, ButtonProps>((props, ref) => {
    const [element, elementRef] = useElement("nd-input", NDButtonElement, props);

    React.useImperativeHandle<NDButtonElement | null, NDButtonElement | null>(
        ref,
        () => elementRef.current,
        [elementRef]
    );

    return element;
});*/
