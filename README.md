# Trueback SDK

The official JavaScript SDK for [Trueback]. Embed a lightweight feedback modal into your React app and send user feedback to your Trueback Dashboard.

## Features

- Simple React-driven feedback modal
- Built-in feedback types: Bug, Praise, Suggestion, General
  configured Trueback endpoint
- Easy theming with CSS variables

## Install

```bash
npm install trueback-sdk
```

## Requirements

- `react` >= 17
- `react-dom` >= 17

## Quick Start

```tsx
import Trueback from "trueback-sdk";

const feedback = new Trueback({
  apiKey: "YOUR_API_KEY",
});

function App() {
  return <button onClick={feedback.open}>Send feedback</button>;
}
```

## Theme customization

Customize the modal look with CSS variables in your app:

```css
:root {
  --primary: oklch(1 0 0);
  --primary-foreground: oklch(0 0 0);
  --secondary: oklch(0.25 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(1 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border: oklch(0.32 0 0);
  --radius: 0.8rem;
}
```

## License

MIT
