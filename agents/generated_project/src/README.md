# Simple Calculator

A lightweight, vanilla‑JavaScript calculator that runs entirely in the browser. It demonstrates clean separation of concerns between the UI and the calculation logic, making it a great reference for beginners and a solid starting point for more advanced projects.

---

## 📖 Overview

The project consists of three main files:

| File | Purpose |
|------|---------|
| `index.html` | The HTML structure – a simple grid of buttons and a display area. |
| `styles.css` | Minimal styling to make the calculator look clean and responsive. |
| `app.js` | A small `Calculator` class that holds the state, validates input, and evaluates expressions.

All logic is encapsulated in the `Calculator` class, which is instantiated once and exposed on the global `window` object for use by the UI event listeners.

---

## ✨ Features

- **Input validation** – Only digits, decimal points, and the four basic operators are accepted.
- **Negative numbers** – The minus sign can appear at the start of the input or immediately after another operator.
- **Decimal handling** – Prevents multiple decimal points in a single number and auto‑precedes a leading zero when a decimal is entered first.
- **Error handling** – Gracefully reports division‑by‑zero and malformed expressions.
- **Responsive design** – Works on desktop and mobile browsers.
- **No external dependencies** – Pure HTML, CSS, and JavaScript.

---

## 🛠️ Technologies

- **HTML5** – Semantic markup for the calculator layout.
- **CSS3** – Flexbox grid and simple styling.
- **JavaScript (ES6+)** – Class syntax, event listeners, and the `Function` constructor for safe expression evaluation.
- **Node.js / npm** – Optional development tooling (see Setup). No build step is required.

---

## 🚀 Setup Instructions

1. **Clone the repository** (or download the ZIP). 
   ```bash
   git clone https://github.com/your-username/simple-calculator.git
   cd simple-calculator
   ```

2. **Install dependencies** – The project only uses vanilla JS, but you may want to install `npm` packages for a development server or linting.
   ```bash
   npm install
   ```

3. **Run the development server** (optional). If you installed `http-server` globally or as a dev dependency, you can serve the `src` folder:
   ```bash
   npx http-server src
   ```
   Then open `http://localhost:8080` in your browser.

4. **Or simply open `src/index.html`** in any modern browser – no server is required.

---

## 📦 Usage Guide

1. **Entering numbers** – Click the digit buttons (0‑9). The digits are appended to the current input.
2. **Operators** – Click `+`, `–`, `×`, or `÷`. The calculator accepts the minus sign at the start or after another operator to indicate negative numbers.
3. **Decimal point** – Click `.`. The calculator ensures only one decimal per number and automatically adds a leading `0` when needed.
4. **Clear** – Click the `C` button to reset the calculator.
5. **Equals** – Click `=` to evaluate the expression. The result will replace the input. If you continue typing after a result, the new input will be appended to the result.

### Example

| Input Sequence | Result |
|----------------|--------|
| `12` + `7` | `19` |
| `5` × `.` `2` | `2.5` |
| `-` `3` + `8` | `5` |

---

## 🛠️ Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Calculator shows **`Error: Division by zero`** | Division by zero | Avoid using `/ 0` or wrap the input with parentheses to ensure proper precedence. |
| Calculator shows **`Error: Malformed expression`** | Missing operand or operator | Ensure every operator has an operand on both sides or use parentheses. |
| Buttons do not respond | JavaScript not loaded | Make sure `app.js` is correctly referenced in `index.html` and that the browser console shows no 404 errors. |
| Unexpected behavior on mobile | Touch event timing | The UI uses `click` events; consider using `pointerdown` for smoother mobile interaction. |

---

## 📄 License

MIT © 2025 Your Name. Feel free to use, modify, and distribute the code as you wish.

---

## 🤝 Contribution Guidelines

1. **Fork** the repository and create a new branch for your feature or bug‑fix.
2. **Write tests** (optional but encouraged) to validate your changes.
3. **Lint** and **format** your code with `npm run lint` (if you added linting).
4. **Submit a pull request** with a clear description of what you changed and why.

We welcome issues, feature requests, and pull requests! If you encounter a bug, open an issue with a minimal reproduction.

---

## 📸 Screenshot

Below is a screenshot of the calculator UI in action:

![Calculator UI](./calculator-screenshot.png)

*If the image does not appear, you can view the live demo by running the development server as described above.*
