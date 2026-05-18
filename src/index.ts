import { createRoot } from "react-dom/client";
import { Modal } from "./modal";
import { createElement } from "react";

interface Config {
  apiKey: string;
}

interface Feedback {
  type: string;
  message: string;
}

class Trueback {
  private config: Config | null = null;
  private container: HTMLDivElement | null = null;

  constructor(config: Config) {
    this.config = config;
  }

  open = () => {
    if (this.container) return;

    this.container = document.createElement("div");
    this.container.id = "trueback-container";
    document.body.appendChild(this.container);

    const root = createRoot(this.container);
    root.render(
      createElement(Modal, {
        close: () => this.close(),
        submit: (feedback) => this.submit(feedback),
      }),
    );
  };

  close = () => {
    if (!this.container) return;

    document.body.removeChild(this.container);
    this.container = null;
  };

  submit = async (feedback: Feedback) => {
    return await fetch(`https://trueback.space/api/sdk/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: this.config!.apiKey,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        ...feedback,
      }),
    });
  };
}

export default Trueback;
