import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./app";

export const renderDemo = () => {
    const rootElement = document.getElementById("root");
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        rootElement
    );
};
