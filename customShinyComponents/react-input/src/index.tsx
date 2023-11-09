import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Root, createRoot } from "react-dom/client";

const customInputTag = "custom-react-input";
/**
 * An example element that renders a react component.
 */
@customElement(customInputTag)
export class ShinyReactComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
      width: fit-content;
    }
  `;

  @property({ type: Number })
  value = 0;

  /*
   * The callback function that is called when the value of the input changes.
   * This alerts Shiny that the value has changed and it should check for the
   * latest value. This is set by the input binding.
   */
  onChangeCallback: null | ((x: boolean) => void) = null;

  reactRoot: Root | null = null;

  /**
   * Function to run when the increment button is clicked.
   */
  onIncrement() {
    this.value++;
    this.onChangeCallback?.(true);
  }

  override render() {
    // Make sure we have a react root setup (this should only run once)
    if (!this.reactRoot) {
      this.reactRoot = createRoot(this.renderRoot);
    }

    // Render the react component into the root
    // Note the use of arrow functions. This makes sure the `this` stays the
    // webcomponent and doesn't get bound away by react.
    this.reactRoot.render(
      <div>
        <span>I'm being rendered by react with value {this.value}</span>
        <button onClick={() => this.onIncrement()}>Click me!</button>
      </div>
    );
  }
}

// Setup the input binding for the custom input
class CustomInputBinding extends Shiny.InputBinding {
  constructor() {
    super();
  }

  override find(scope: HTMLElement): JQuery<HTMLElement> {
    return $(scope).find(customInputTag);
  }

  override getValue(el: ShinyReactComponent) {
    return el.value;
  }

  override subscribe(
    el: ShinyReactComponent,
    callback: (x: boolean) => void
  ): void {
    // Our custom input has a callback that it calls when its value has changed.
    // By setting this here we can alert Shiny that the value has changed and it
    // should check for the latest value.
    el.onChangeCallback = callback;
  }

  override unsubscribe(el: ShinyReactComponent): void {
    el.onChangeCallback = null;
  }
}

Shiny.inputBindings.register(new CustomInputBinding(), customInputTag);
