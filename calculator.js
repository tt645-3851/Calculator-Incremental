const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator-keys')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        if (!action) {
            console.log("It's a number key");
        }
        if (action === 'add' || 
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log("It's an operator key");
        }
        if (action === 'decimal') {
            console.log('decimal key');
        }
        if (action === 'clear') {
            console.log('clear key');
        }
        if (action === 'calculate') {
            console.log('equal key');
        }
    }
})