# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). 

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](#)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS grid
- JavaScript
- JavaScript regular expressions
- Keyboard support
- Implemented without using eval()


### What I learned

This was a great project to practice implementing a 3-colour theme switcher. I used `prefers-color-scheme` and local storage to ensure the selected theme would remain upon a page refresh. 

I learned more about using complex regex to add in a thousands separator, and to split the expression string into an array of numbers and operators. One difficulty I had was how to recognise negative numbers. I solved this using a lookbehind assertion to check whether the character preceeding a negative symbol was a number or operator.

A key focus was to implement this without using the problematic eval() function, and to manually evaluate the expression using BEDMAS.

### Continued development

In the future I would like to rebuild this with React. I would also like to write test cases, as all my testing was done manually.


### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.