const button = document.querySelector('button')!;

function clickHandler(message: string) {
    console.log('Clicked ' + message);
}

// event
button.addEventListener('click', clickHandler.bind(this, "You're "));