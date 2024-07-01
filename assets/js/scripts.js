const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");

const keys = document.querySelectorAll(".keys");
const deleteKey = document.getElementById("del");
const resetKey = document.getElementById("reset");
const equalsKey = document.getElementById("equals");
let screen = document.getElementById("calc-screen");
let decimal = false;
const operators = ["+", "x", "/"];

// add event listeners to calculator keys
keys.forEach(key => key.addEventListener('click', () => {
    addValues(key.value);
}));

function addValues(key) {
    const lastChar = screen.innerText[screen.innerText.length - 1];

    if (screen.innerText === "0" || screen.innerText.includes("ERROR")) {
        if (key === "." && screen.innerText === "0") {
            screen.innerText += key;
            decimal = true;
        } else if (!operators.includes(key)) {
            screen.innerText = key;
        }
    } else if (key === ".") {
        if (!decimal) {
            screen.innerText += key;
            decimal = true;
        }
    } else if (operators.includes(key)) {
        if (operators.includes(lastChar)) {
            screen.innerText = screen.innerText.slice(0, -1) + key;
        } else {
            screen.innerText += key;
        }
        decimal = false;
    } else if (key === "-" && lastChar !== "-") {
        screen.innerText += key;
        decimal = false;
    } else if (!operators.includes(key) && key !== "-") {
        screen.innerText += key;
    }
}

// calculator delete key functionality
deleteKey.addEventListener("click", () => {
    const lastChar = screen.innerText[screen.innerText.length - 1];

    if (screen.innerText.length === 1) {
        screen.innerText = "0";
        decimal = false;
    } 
    if (screen.innerText !== "0") {
        screen.innerText = screen.innerText.slice(0, -1);
        if (lastChar === ".") {
            decimal = false;
        }
    }
})

// calculator reset key functionality
resetKey.addEventListener("click", () => {
    screen.innerText = "0";
    decimal = false;
})
  
// calculator evaluate the equation
equalsKey.addEventListener("click", () => {
    screen.innerText = evaluateExpression(screen.innerText);
})

function evaluateExpression(expression) {
    
    // replace x with * in the expression
    expression = expression.replace(/x/g, '*')

    // split the expression into numbers and operators
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    
    if (!tokens) return "ERROR";

    // check for negative numbers
    if (tokens[0] === "-") {
        tokens[1] = "-" + tokens[1];
        tokens.splice(0, 1);
    }

    // helper function to perform a single operation
    function operate(a, operator, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : "ZERO DIVISION ERROR";
            default: return "ERROR";
        }
    }

    // perform multiplication and division first
    // start at index 1 because operators are at odd index, numbers are at even index
    for (let i = 1; i < tokens.length - 1; i += 2) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const result = operate(tokens[i-1], tokens[i], tokens[i+1]);
            if (typeof result === 'string') return result;
            // replace the 3 items with the result, and reset index to account for removal
            tokens.splice(i-1, 3, result);
            i -= 2;
        }
    }

    // then perform addition and subtraction with the revised array
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const nextResult = operate(result, tokens[i], tokens[i+1]);
        if (typeof nextResult === 'string') return nextResult; // Error occurred
        result = nextResult;
    }
    
    // make sure the result has a maximumm of 6 decimal places
    result = parseFloat(parseFloat(result).toFixed(6));
    decimal = expression.includes(".") ? true : false;

    return result;
}

// theme switcher functionality
theme1.addEventListener("click", () => { setTheme(theme1.value) });
theme2.addEventListener("click", () => { setTheme(theme2.value) });
theme3.addEventListener("click", () => { setTheme(theme3.value) });

function setTheme(theme) {
    document.querySelector("body").classList = theme;
    localStorage.setItem("colorMode", theme);
};

// get colour from local storage
function colorModeFromLocalStorage() {
    return localStorage.getItem("colorMode");
};

// get prefered colour scheme from the user, this works with the media query
function colorModeFromPreferences() {
    return window.matchMedia('(prefers-color-scheme: light)').matches
        ? "theme2"
        : "theme1"
};

function switchMode() {
    const color = colorModeFromLocalStorage() || colorModeFromPreferences();

    if (color == "theme3") {
        theme3.click();
    } else if (color == "theme2") {
        theme2.click();
    } else {
        theme1.click();
    }
};

// check if user preference is set to light mode, and adjust checkbox and theme
switchMode();
