document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('inputBox');
    let buttons = document.querySelectorAll('.calc-btn');

    let string = "";
    let lastResult = false;

    const updateDisplay = (value) => {
        input.value = value || "0";
    };

    const calculate = () => {
        try {
            // Replace display symbols with actual operators
            let expression = string.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
            let result = eval(expression);
            
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid calculation');
            }
            
            // Format the result
            if (result.toString().length > 12) {
                result = parseFloat(result.toPrecision(10));
            }
            
            string = result.toString();
            updateDisplay(string);
            lastResult = true;
        } catch (error) {
            updateDisplay("Error");
            string = "";
            setTimeout(() => {
                updateDisplay("0");
            }, 1500);
        }
    };

    const square = () => {
        try {
            let num = parseFloat(string);
            if (isNaN(num)) throw new Error('Invalid input');
            
            let result = num * num;
            string = result.toString();
            updateDisplay(string);
            lastResult = true;
        } catch (error) {
            updateDisplay("Error");
            string = "";
            setTimeout(() => updateDisplay("0"), 1500);
        }
    };

    const cube = () => {
        try {
            let num = parseFloat(string);
            if (isNaN(num)) throw new Error('Invalid input');
            
            let result = num * num * num;
            string = result.toString();
            updateDisplay(string);
            lastResult = true;
        } catch (error) {
            updateDisplay("Error");
            string = "";
            setTimeout(() => updateDisplay("0"), 1500);
        }
    };

    const round = () => {
        try {
            let num = parseFloat(string);
            if (isNaN(num)) throw new Error('Invalid input');
            
            let result = Math.round(num);
            string = result.toString();
            updateDisplay(string);
            lastResult = true;
        } catch (error) {
            updateDisplay("Error");
            string = "";
            setTimeout(() => updateDisplay("0"), 1500);
        }
    };

    const percentage = () => {
        try {
            let num = parseFloat(string);
            if (isNaN(num)) throw new Error('Invalid input');
            
            let result = num / 100;
            string = result.toString();
            updateDisplay(string);
            lastResult = true;
        } catch (error) {
            updateDisplay("Error");
            string = "";
            setTimeout(() => updateDisplay("0"), 1500);
        }
    };

    const clearInput = () => {
        string = "";
        updateDisplay("0");
        lastResult = false;
    };

    const deleteLastChar = () => {
        if (string.length > 0) {
            string = string.slice(0, -1);
            updateDisplay(string || "0");
        }
    };

    const updateInput = (value) => {
        if (lastResult && !isNaN(value)) {
            string = "";
            lastResult = false;
        }
        
        string += value;
        updateDisplay(string);
    };

    // Add visual feedback for button presses
    const addButtonFeedback = (button) => {
        button.style.transform = 'translateY(1px) scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    };

    // Button click handlers
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            let action = event.currentTarget.getAttribute('data-action');
            addButtonFeedback(event.currentTarget);

            switch(action) {
                case '=':
                    calculate();
                    break;
                case 'Del':
                    deleteLastChar();
                    break;
                case 'AC':
                    clearInput();
                    break;
                case 'Sqr':
                    square();
                    break;
                case 'Cub':
                    cube();
                    break;
                case '%':
                    percentage();
                    break;
                case 'Rnd':
                    round();
                    break;
                case '/':
                    updateInput('÷');
                    break;
                case '*':
                    updateInput('×');
                    break;
                case '-':
                    updateInput('−');
                    break;
                default:
                    updateInput(action);
            }
        });

        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        let key = event.key;

        // Find the corresponding button for visual feedback
        let correspondingButton = null;
        
        if (!isNaN(key) || ['.', '(', ')'].includes(key)) {
            correspondingButton = document.querySelector(`[data-action="${key}"]`);
            updateInput(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            const symbols = {'+': '+', '-': '−', '*': '×', '/': '÷'};
            correspondingButton = document.querySelector(`[data-action="${key}"]`);
            updateInput(symbols[key]);
        } else if (key === 'Enter' || key === '=') {
            correspondingButton = document.querySelector('[data-action="="]');
            calculate();
        } else if (key === 'Backspace') {
            correspondingButton = document.querySelector('[data-action="Del"]');
            deleteLastChar();
        } else if (key === 'Escape' || key === 'Delete') {
            correspondingButton = document.querySelector('[data-action="AC"]');
            clearInput();
        } else if (key === '%') {
            correspondingButton = document.querySelector('[data-action="%"]');
            percentage();
        }

        // Add visual feedback for keyboard presses
        if (correspondingButton) {
            addButtonFeedback(correspondingButton);
        }
        
        event.preventDefault();
    });

    // Initialize display
    updateDisplay("0");

    // Add some easter eggs
    let clickCount = 0;
    const logo = document.querySelector('.text-center');
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                logo.innerHTML = '🎉 Professional Calculator 🎉';
                setTimeout(() => {
                    logo.innerHTML = 'Professional Calculator';
                    clickCount = 0;
                }, 2000);
            }
        });
    }

    // Prevent context menu on buttons for better mobile experience
    buttons.forEach(button => {
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });

    // Add touch feedback for mobile devices
    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            addButtonFeedback(button);
        });
    });
});