import * as React from "react";
import { render, screen } from "@testing-library/react";

import { App } from "./app";
import { NDElement } from "./custom-elements";

describe("App", () => {
    it("renders instances of NDElement", () => {
        render(<App />);

        const buttonElement = screen.getByText(/Click me/i);
        
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeInstanceOf(NDElement);
    });
});
