document.addEventListener('DOMContentLoaded', function() {
    // Selecting the display element and all buttons
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    // Variables to store current input, previous input, and operator
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    // Adding event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.id; // Getting the ID of the clicked button

            // Handling clear button
            if (value === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } 
            // Handling backspace button
            else if (value === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } 
            // Handling equals button
            else if (value === 'equals') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } 
            // Handling operator buttons (+, -, *, /)
            else if (['add', 'subtract', 'multiply', 'divide'].includes(value)) {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = calculate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    operator = value;
                }
            } 
            // Handling numeric and decimal buttons
            else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    // Function to perform calculations based on operator
    function calculate(num1, num2, op) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        if (op === 'add') return (a + b).toString();
        if (op === 'subtract') return (a - b).toString();
        if (op === 'multiply') return (a * b).toString();
        if (op === 'divide') return (a / b).toString();
    }
});
