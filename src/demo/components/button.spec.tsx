import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NDButtonElement } from "../custom-elements";

import { Button } from "./button";

describe("createComponent", () => {
    it("responds to Button's onPress event", () => {
        const onPress = jest.fn();

        render(<Button onPress={onPress}>Click me</Button>);

        const buttonEl = screen.getByText(/Click me/i) as NDButtonElement;
        expect(buttonEl).toBeInTheDocument();
        
        const innerButtonEl = buttonEl["refs"].button;
        userEvent.click(innerButtonEl);
        
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
