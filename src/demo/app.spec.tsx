import { render, screen } from "@testing-library/react";

import { App } from "./app";
import { NDElement } from "./custom-elements";

describe("App", () => {
    it("renders instances of NDElement", () => {
        render(<App />);

        const buttonEl = screen.getByText(/Click me/i);
        
        expect(buttonEl).toBeInTheDocument();
        expect(buttonEl).toBeInstanceOf(NDElement);
    });
});
