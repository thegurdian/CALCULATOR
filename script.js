// Get references to the input field and buttons
const inputField = document.querySelector('input');
const buttons = document.querySelectorAll('#buttons button');

// Variable to store the current input
let currentInput = '';

// Function to update the input field
function updateInput(value) {
    currentInput += value; // Append the value to the current input
    inputField.value = currentInput; // Display the current input
}

// Function to evaluate the expression
function evaluateExpression() {
    try {
        // Replace the '^' with '**' for exponentiation
        const formattedInput = currentInput
            .replace(/\^/g, '**') // Handle exponentiation
            .replace(/sin/g, 'Math.sin') // Convert sin to Math.sin
            .replace(/cos/g, 'Math.cos') // Convert cos to Math.cos
            .replace(/tan/g, 'Math.tan') // Convert tan to Math.tan
            .replace(/√/g, 'Math.sqrt') // Convert √ to Math.sqrt
            .replace(/π/g, 'Math.PI') // Convert π to Math.PI
            .replace(/log/g, 'Math.log10') // Convert log to base 10
            .replace(/(\w+)\(([^)]+)\)/g, (match, func, arg) => {
                // Convert degrees to radians for trig functions
                return `${func}(${arg} * Math.PI / 180)`;
            });

        // Evaluate the expression
        const result = eval(formattedInput); // Evaluate the formatted input
        inputField.value = result; // Display the result
        currentInput = result.toString(); // Update current input to result
    } catch (error) {
        inputField.value = 'Error'; // Display error message
        currentInput = ''; // Reset current input
    }
}

// Function to calculate factorial
function factorial(num) {
    if (num < 0) return undefined; // Factorial of negative numbers is undefined
    if (num === 0 || num === 1) return 1; // Base case
    return num * factorial(num - 1); // Recursive case
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent; // Get the button text

        // Check for specific button actions
        if (buttonValue === 'AC') {
            // Clear the input field and reset current input
            currentInput = '';
            inputField.value = '';
        } else if (buttonValue === 'CE') {
            // Clear the last character of the current input
            currentInput = currentInput.slice(0, -1);
            inputField.value = currentInput;
        } else if (buttonValue === '=') {
            // Evaluate the expression when the equals button is pressed
            evaluateExpression();
        } else if (buttonValue === 'x!') {
            // Calculate factorial
            const number = parseFloat(currentInput);
            const result = factorial(number);
            inputField.value = result !== undefined ? result : 'Error';
            currentInput = ''; // Reset current input
        } else {
            // For all other buttons, update the input field
            updateInput(buttonValue);
        }
    });
});
