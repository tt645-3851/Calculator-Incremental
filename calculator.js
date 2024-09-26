const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        if (action === 'add' || 
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.operator;
            let secondValue = displayedNum;

            if (firstValue && operator && previousKeyType !== 'operator') {
                const calculatedValue = calculate(firstValue, operator, secondValue);
                display.textContent = calculatedValue;
                calculator.dataset.firstValue = calculatedValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
            
        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';            
            } else if (previousKeyType === 'operator') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if (action === 'clear') {
            calculator.dataset.previousKeyType = 'clear';
        }
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            let secondValue = displayedNum;
            let operator = calculator.dataset.operator;

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
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