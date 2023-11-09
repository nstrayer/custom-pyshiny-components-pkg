import { createRoot } from "react-dom/client";
import { addStylesForTag } from "./addStylesForTag";

const customInputTag = "custom-react-input";

const styles = `
${customInputTag} {
  display: block;
  border: solid 1px gray;
  padding: 16px;
  width: fit-content;
}

${customInputTag} .container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
`;

/**
 * An example element that renders a react component.
 */
class ShinyReactComponent extends HTMLElement {
  /**
   * The current value of the input.
   */
  value = 0;

  constructor() {
    super();

    // Add styles to the dom for this component
    addStylesForTag(customInputTag, styles);
  }

  /**
   * Function to run when the increment button is clicked.
   */
  onIncrement() {
    this.value++;

    // Emit a custom event saying this tag has changed.
    // This event is subscribed to by the shiny input binding
    // to alert shiny that the value has changed.
    this.dispatchEvent(new CustomEvent("input-change"));
  }

  connectedCallback() {
    // Render the react component into the root
    // Note the use of arrow functions. This makes sure the `this` stays the
    // webcomponent and doesn't get bound away by react.
    createRoot(this).render(
      <div className="container">
        <span>I'm being rendered by react</span>
        <button onClick={() => this.onIncrement()}>Click me!</button>
      </div>
    );
  }
}

customElements.define(customInputTag, ShinyReactComponent);

// Setup the input binding for the custom input
class ReactWithLitBinding extends Shiny.InputBinding {
  constructor() {
    super();
  }

  override find(scope: HTMLElement): JQuery<HTMLElement> {
    return $(scope).find(customInputTag);
  }

  override getValue(el: ShinyReactComponent) {
    return el.value;
  }

  onChangeCallback: () => void = () => null;

  override subscribe(
    el: ShinyReactComponent,
    callback: (x: boolean) => void
  ): void {
    // Store the callback so we can unsubscribe later
    this.onChangeCallback = () => callback(true);

    // Subscribe to the custom event that is emitted when the value changes.
    el.addEventListener("change", this.onChangeCallback);
  }

  override unsubscribe(el: ShinyReactComponent): void {
    el.removeEventListener("change", this.onChangeCallback);
  }
}

Shiny.inputBindings.register(new ReactWithLitBinding(), customInputTag);
