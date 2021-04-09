export class NDElement extends HTMLElement {
    protected refs: Record<string, Node> = {};

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
}
