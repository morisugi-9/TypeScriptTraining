"use strict";
const button = document.querySelector('button');
function clickHandler(message) {
    console.log('Clicked ' + message);
}
// event
button.addEventListener('click', clickHandler.bind(this, "You're Welcome!"));
//# sourceMappingURL=app.js.map