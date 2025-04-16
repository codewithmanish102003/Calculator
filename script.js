document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('inputBox');
    let buttons = document.querySelectorAll('button');

    let string = "";

    const calculate = () => {
        try {
            string = eval(string);
            input.value = string;
        } catch (error) {
            input.value = "Error: Invalid Expression";
            string = "";
        }
    };

    const Square = () => {
        try {
            string = (parseFloat(string) * parseFloat(string)).toString();
            input.value = string;
        } catch (error) {
            input.value = "Error: Invalid Input";
            string = "";
        }
    }

    const Cube = () => {
        try {
            string = (parseFloat(string) * parseFloat(string) * parseFloat(string)).toString();
            input.value = string;
        } catch (error) {
            input.value = "Error: Invalid Input";
            string = "";
        }
    }

    const Round = () => {
        try {
            string = Math.round(parseFloat(string)).toString();
            input.value = string;
        } catch (error) {
            input.value = "Error: Invalid Input";
            string = "";
        }
    }

    const Percentage = () => {
        try {
            string = (parseFloat(string) / 100).toString();
            input.value = string;
        } catch (error) {
            input.value = "Error: Invalid Input";
            string = "";
        }
    }

    const clearInput = () => {
        string = "";
        input.value = string;
    };

    const updateInput = (value) => {
        string += value;
        input.value = string;
    };

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            let value = event.target.innerHTML;

            if (value === '=') {
                calculate();
            } else if (value === "Del") {
                string = string.substring(0, string.length - 1);
                input.value = string;
            } else if (value === 'AC') {
                clearInput();
            } else if (value === "Sqr") {
                Square();
            } else if (value === "Cub") {
                Cube();
            } else if (value === '%') {
                Percentage();
            } else if (value === 'Rnd') {
                Round();
            } else {
                updateInput(value);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        let key = event.key;

        if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(key)) {
            updateInput(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else if (key === 'Escape') {
            clearInput();
        }
    });
});