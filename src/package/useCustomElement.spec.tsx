import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { ButtonProps } from "../demo/components";
import { NDButtonElement } from "../demo/custom-elements";

import { useCustomElement } from "./useCustomElement";

describe("useCustomElement", () => {
    customElements.define("nd-button", NDButtonElement);

    it("should render an HTMLElement instance with defined props", () => {
        const ButtonWrapper = (props: ButtonProps) => {
            const [reactElement] = useCustomElement<NDButtonElement, ButtonProps>("nd-button", props);
            return reactElement;
        };
    
        render(
            <ButtonWrapper style={{ border: "1px solid red" }} className="myButton">
                Click me
            </ButtonWrapper>
        );

        const element = screen.getByText(/Click me/i);
        expect(element).toBeInstanceOf(NDButtonElement);
        expect(element.className).toBe("myButton");
        expect(element.style.border).toBe("1px solid red");
    });

    it("should return a React Element with defined props", () => {
        const props: ButtonProps = {
            style: { border: "1px solid red" },
            className: "myButton",
        };
        const { result } = renderHook(() => useCustomElement("nd-button", props));
        const [reactElement] = result.current;

        expect(reactElement.props).toMatchObject({ style: { border: "1px solid red" } });
    });
});
