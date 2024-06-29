const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");

const keys = document.querySelectorAll(".keys");
const deleteKey = document.getElementById("del");
const resetKey = document.getElementById("reset");
const equalsKey = document.getElementById("equals");
let screen = document.getElementById("calc-screen");
const operators = ['+', 'x', '/'];

// add event listeners to calculator keys
keys.forEach(key => key.addEventListener('click', () => {
    addValues(key.value);
}));

function addValues(key) {   
    // check if it's the first entry
    if (screen.innerText === "0" && operators.includes(key)) {
        //ignore
    }
    else if (screen.innerText === "0") {
        screen.innerText = key;
    } 
    // check that operators are not added consecutively
    else if (operators.includes(key) && operators.includes(screen.innerText[screen.innerText.length - 1])) {
        screen.innerText = screen.innerText.slice(0, -1) + key;
    } 
    // check that "-" is not added consecutively
    else if (key === "-" && screen.innerText[screen.innerText.length - 1] === "-") {
        //ignore
    } 
    else {
        screen.innerText += key;
    }
}

// calculator delete key functionality
deleteKey.addEventListener("click", () => {
    if (screen.innerText.length === 1) {
        screen.innerText = "0";
    } 
    if (screen.innerText !== "0") {
        screen.innerText = screen.innerText.slice(0, -1);
    } 
})

// calculator reset key functionality
resetKey.addEventListener("click", () => {
    screen.innerText = "0";
})
  
// calculator evaluate equation
equalsKey.addEventListener("click", () => {
    let equation = screen.innerText;
    // replace x with *
    equation = equation.replace(/x/g, '*')
    
    screen.innerText = equation;
})

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
