import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ButtonProps } from "../demo/components";
import { NDButtonElement } from "../demo/custom-elements";

import { createComponent } from "./createComponent";

describe("createComponent", () => {
    customElements.define("nd-button", NDButtonElement);

    it("has a forwarded ref", () => {
        const ButtonWithRef = createComponent<NDButtonElement, ButtonProps>("nd-button", { forwardRef: true });
        const Wrapper = (props: { onPress: (element: NDButtonElement | null) => void }) => {
            const buttonRef = React.useRef<NDButtonElement | null>(null);
            return (
                <ButtonWithRef
                    ref={buttonRef}
                    onPress={() => props.onPress(buttonRef.current)}
                >
                    Hello world
                </ButtonWithRef>
            );
        };
        const onWrapperPress = jest.fn();

        render(<Wrapper onPress={onWrapperPress} />);

        const buttonEl = screen.getByText(/Hello world/i) as NDButtonElement;
        expect(buttonEl).toBeInTheDocument();

        const innerButtonEl = buttonEl["refs"].button;
        userEvent.click(innerButtonEl);

        expect(onWrapperPress).toHaveBeenCalledTimes(1);
    });
});
