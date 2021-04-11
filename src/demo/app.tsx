import * as React from "react";
import "./styles.css";

import * as components from "./components";

export const App = () => {
    const [clickCount, setClickCount] = React.useState<number>(0);
    const onClick = React.useCallback(() => setClickCount((c) => c + 1), []);

    return (
        <div className="App">
            <h1>reactify-custom-elements</h1>

            <section>
                <h2>Button</h2>
                <components.Button
                    className="foo"
                    style={{ outlineColor: "blue" }}
                    onPress={onClick}
                >
                    Click me {clickCount}
                </components.Button>
            </section>
        </div>
    );
};
