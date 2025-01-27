import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import css from "./index.css?inline";
import "./index.css";

export const initializeReactApp = (appElement, rootElement, children?) => {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App
        user={appElement.getAttribute("data-user") || import.meta.env.USER}
        hash={appElement.getAttribute("data-hash") || import.meta.env.VITE_HASH}
        assistantId={
          appElement.getAttribute("data-assistant") ||
          import.meta.env.VITE_ASSISTANT_ID
        }
        children={children}
      />
    </React.StrictMode>
  );
};

class CustomAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const appElement = this.parentElement as HTMLTemplateElement;
    if (appElement) {
      // const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });

      // create variable to attach the tailwind stylesheet
      const style = document?.createElement("style");

      // attach the stylesheet as text
      style.textContent = css;

      // apply the style
      shadowRoot.appendChild(style);

      const rootElement = document?.createElement("div");
      rootElement.setAttribute("class", "sk-serviceroot");
      shadowRoot.appendChild(rootElement);

      if (rootElement) {
        initializeReactApp(appElement, rootElement);
      } else {
        console.error("Root element for React app not found.");
      }
    } else {
      console.error("Template not found in parent element.");
    }
  }
}

const container = document?.getElementById("sk-service-assistant");

if (container) {
  if (container.getAttribute("data-shadow") !== "true") {
    container.setAttribute("class", "sk-serviceroot sk-service-assistant");
    const children = container.innerHTML;

    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      container.removeChild(child);
    }

    // create variable to attach the tailwind stylesheet
    const style = document?.createElement("style");

    // attach the stylesheet as text
    style.textContent = css;

    // apply the style
    container.parentElement.appendChild(style);

    initializeReactApp(container, container, children);
  } else {
    const id = `service-assistant-shadow`;
    customElements.define(id, CustomAppComponent);
    container.appendChild(document?.createElement(id));
  }
}
