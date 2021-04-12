# reactify-custom-elements

This library helps turning custom elements (web components) into React components.

# Installation

With NPM:

```bash
npm i reactify-custom-elements
```

With Yarn:

```bash
yarn add reactify-custom-elements
```

# Use cases

Since you're reading this, you may have realized that React and custom elements (aka web components) aren't playing along very well. React handles every available native elements respectively and has therefor no knowledge whatsoever how a custom element is implemented and what properties, attributes and events it has.

What this library does is creating a middleman between those ends to make use of custom elements in React a little bit (actually a lot) easier. It can be done in two ways:

- Create a wrapper component (see [API > createComponent](#createcomponent))
- Use of a hook (see [API > useCustomElement](#usecustomelement))

# Usage

```tsx
import * as React from "react";
import { createComponent } from "reactify-custom-elements";
import { CustomButtonElement } from "./customButtonElement";

interface CustomButtonProps {
    onPress?: () => void;
}

window.customElements.define("custom-button", CustomButtonElement);

const CustomButton = createComponent("custom-button", {
    forwardRef: true, // false
});

function App() {
    return (
        <CustomButton onPress={() => alert("TADA!")}>
            Hit me
        </CustomButton>
    );
}

```

# API

## createComponent

```ts
function createComponent<
    E extends HTMLElement = HTMLElement,
    P extends {} = {}
>(
    elementName: string,
    options?: CreateComponentOptions
) : React.ForwardRefExoticComponent | (props: P) => React.Element
```

###  Options

| Property | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| forwardRef | `boolean` | false | Forward the element instance ref. This is false by default in case the ref is never going to be used. |
| mapPropName | `function(propName: string) : string` | undefined | Use this if you need to rename a React property to match the custom element's property, attribute or event. |

## useCustomElement

```ts
function useCustomElement<
    E extends HTMLElement = HTMLElement,
    P extends {} = {}
>(
    elementName: string,
    elementProps?: P,
    options?: UseCustomElementOptions
) : [
    element: React.ReactElement,
    ref: React.MutableRefObject<HTMLElement | null>
]
```

###  Options

| Property | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| mapPropName | `function(propName: string) : string` | undefined | Use this if you need to rename a React property to match the custom element's property, attribute or event. |
