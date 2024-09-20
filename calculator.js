const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator-keys')
const display = document.querySelector('.calculator-display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            console.log("It's a number key");
        }
        if (action === 'add' || 
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            console.log("It's an operator key")
        }
        if (action === 'decimal' && !display.textContent.includes('.')) {
            display.textContent = displayedNum + '.'
            console.log('decimal key')
        }
        if (action === 'clear') {
            console.log('clear key')
        }
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const secondValue = displayedNum
            const operator = calculator.dataset.operator

            display.textContent = calculate(firstValue, operator, secondValue)
            console.log('equal key')
        }
    }
})

function calculate(firstNum, operator, secondNum) {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(firstNum) + parseFloat(secondNum)
    } else if (operator === 'subtract') {
        result = parseFloat(firstNum) - parseFloat(secondNum)
    } else if (operator === 'multiply') {
        result = parseFloat(firstNum) * parseFloat(secondNum)
    } else if (operator === 'divide') {
        result = parseFloat(firstNum) / parseFloat(secondNum)
    }

    return result
}