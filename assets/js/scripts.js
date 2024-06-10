const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");

theme1.addEventListener("click", setTheme1);
theme2.addEventListener("click", setTheme2);
theme3.addEventListener("click", setTheme3);

function setTheme1() {
    document.querySelector("body").classList = "theme1";
    localStorage.setItem("colorMode", "theme1");
};

function setTheme2() {
    document.querySelector("body").classList = "theme2";
    localStorage.setItem("colorMode", "theme2");
};

function setTheme3() {
    document.querySelector("body").classList = "theme3";
    localStorage.setItem("colorMode", "theme3");
};

// get colour from local storage
function colorModeFromLocalStorage() {
    return localStorage.getItem("colorMode");
};

// get prefered colour scheme from the user
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


// check if user preference is set to light mode, and adjust checkbox
switchMode();