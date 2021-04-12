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
});
