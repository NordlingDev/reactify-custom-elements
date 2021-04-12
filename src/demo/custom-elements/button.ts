import { NDElement } from "./element";

export class NDButtonElement extends NDElement {
    protected refs = {
        button: document.createElement("button"),
    };

    constructor() {
        super();
        const { button } = this.refs;

        button.appendChild(document.createElement("slot"));
        this.shadowRoot?.appendChild(button);
    }

    connectedCallback() {
        const { button } = this.refs;
        button.addEventListener("click", this._onButtonClick);
    }

    disconnectedCallback() {
        const { button } = this.refs;
        button.removeEventListener("click", this._onButtonClick);
    }

    // Private methods
    private _onButtonClick = () => {
        this.dispatchEvent(new Event("press"));
    }
}
