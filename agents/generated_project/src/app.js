// src/app.js
// Calculator class encapsulating state and logic for a simple calculator.
// This file is imported by index.html and used by UI event handlers.

/**
 * Calculator class
 * Maintains the current input string and the last evaluated result.
 */
class Calculator {
    /**
     * Initializes the calculator state.
     *   input  - string of digits/operators entered by the user.
     *   result - last evaluated numeric result or null if none.
     */
    constructor() {
        this.input = '';
        this.result = null;
    }

    /**
     * Reset the calculator to its initial state.
     */
    clear() {
        this.input = '';
        this.result = null;
    }

    /**
     * Append a digit or operator to the current input.
     * @param {string} value - The character to append.
     */
    append(value) {
        // Basic validation: allow only digits, operators, and decimal point.
        const validChars = /^[0-9+\-*/.]$/;
        if (!validChars.test(value)) {
            return; // ignore any unexpected characters
        }

        // Helper: check if a string contains an operator
        const isOperator = (ch) => /[+\-*/]/.test(ch);

        // If value is a digit, simply append.
        if (/[0-9]/.test(value)) {
            this.input += value;
            return;
        }

        // If value is a decimal point.
        if (value === '.') {
            // Find the current number segment (everything after the last operator).
            const lastNumberMatch = this.input.match(/([0-9]*\.?[0-9]*)$/);
            if (lastNumberMatch && lastNumberMatch[0].includes('.')) {
                // The current number already has a decimal point; ignore.
                return;
            }
            // If starting a new number after an operator or at the very beginning,
            // prepend a leading zero for clarity (e.g., '.5' -> '0.5').
            const lastChar = this.input.slice(-1);
            if (this.input === '' || isOperator(lastChar)) {
                this.input += '0';
            }
            this.input += '.';
            return;
        }

        // If value is an operator.
        const lastChar = this.input.slice(-1);

        // Handle minus sign: allow at the start or immediately after an operator (negative number).
        if (value === '-') {
            if (this.input === '' || isOperator(lastChar)) {
                this.input += value;
            }
            return;
        }

        // For other operators (+, *, /), disallow if input is empty or the last character is already an operator.
        if (this.input === '' || isOperator(lastChar)) {
            // Invalid sequence: operator at start or consecutive operators.
            return;
        }

        // Append the operator.
        this.input += value;
    }

    /**
     * Evaluate the current input string.
     * Handles division by zero and syntax errors.
     * @returns {number|string} The numeric result or an error string.
     */
    evaluate() {
        // If input is empty or only whitespace, treat as 0.
        if (this.input.trim() === '') {
            this.result = 0;
            return 0;
        }
        try {
            // Evaluate the expression safely. Use Function constructor to avoid eval.
            const result = Function(`return ${this.input}`)();
            // Check for division by zero or other non-finite results.
            if (!Number.isFinite(result)) {
                // Division by zero results in Infinity or -Infinity.
                this.result = 'Error: Division by zero';
                return this.result;
            }
            this.result = result;
            return result;
        } catch (e) {
            // Syntax errors or other evaluation failures.
            this.result = 'Error: Malformed expression';
            return this.result;
        }
    }

    /**
     * Get the string to display on the calculator screen.
     * If a result exists, display it; otherwise display the current input.
     * @returns {string}
     */
    getDisplay() {
        if (this.result !== null) {
            return this.result.toString();
        }
        return this.input || '0';
    }
}

// Create a singleton instance that can be used by UI event handlers.
const calculator = new Calculator();

// Expose the instance on the global window object for non-module scripts.
if (typeof window !== 'undefined') {
    window.calculator = calculator;

    // Set up DOM event listeners after DOMContentLoaded.
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('button[data-action]');
        buttons.forEach((btn) => {
            btn.addEventListener('click', function () {
                const action = this.dataset.action;
                const value = this.dataset.value;
                switch (action) {
                    case 'digit':
                    case 'operator':
                        calculator.append(value);
                        break;
                    case 'clear':
                        calculator.clear();
                        break;
                    case 'equals':
                        calculator.evaluate();
                        break;
                    default:
                        break;
                }
                const display = document.getElementById('display');
                if (display) {
                    display.textContent = calculator.getDisplay();
                }
            });
        });
    });
}

// Export for module environments (optional).
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { calculator, Calculator };
}
