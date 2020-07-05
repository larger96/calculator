//..::QUERY SELECTORS::..
const numberButtons = document.querySelectorAll('#number');
const operatorButtons = document.querySelectorAll('#operator');
const allClearButton = document.querySelector('#allclear');
const deleteButton = document.querySelector('#delete');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');
const currentOperandText = document.querySelector('.current-operand');
const previousOperandText = document.querySelector('.previous-operand');

//..::INITIAL VALUES::..
this.currentOperand = '';
this.previousOperand = '';
this.operation = '';
this.currentOperandText = currentOperandText;
this.previousOperandText = previousOperandText;

//..::EVENT LISTENERS::..
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    })
})

allClearButton.addEventListener('click', button => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', button => {
    remove();
    updateDisplay();
});

decimalButton.addEventListener('click', button => {
    addDecimal();
    updateDisplay();
})

equalsButton.addEventListener('click', button => {
    operate(this.operation);
    updateDisplay();
})

//..::OPERATOR FUNCTIONS::..
const add = (a, b) => {return a + b};
const subtract = (a, b) => {return a - b};
const multiply = (a, b) => {return a * b};
const divide = (a, b) => {
    if (b === 0) {
        return 'CONGRATULATIONS! YOU BROKE MATH'
    } 
    return a / b};

const operate = function(operator) {
    if (this.currentOperand === '' || this.previousOperand === '') {
        return;
    };
    let result
    const a = parseFloat(this.previousOperand);
    const b = parseFloat(this.currentOperand);
    switch(operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
    }
    this.currentOperand = result;
    this.operation = '';
    this.previousOperand = '';
};

//..::MAIN FUNCTIONS::..
let clear = function() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
}

let remove = function() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
}

let appendNumber = function(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
};

let chooseOperation = function(operation) {
    if (this.previousOperand !== '') {
        operate(this.operation);
    };
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
};

let updateDisplay = function() {
    this.currentOperandText.innerText = this.currentOperand;
    this.previousOperandText.innerText = `${this.previousOperand} ${this.operation} `;
};

let addDecimal = function() {
    if(Array.from(this.currentOperand).includes('.')) {
        return;
    } else if (this.currentOperand === '') {
        this.currentOperand = this.currentOperand + '0.';
    } else {
        this.currentOperand = this.currentOperand + '.';
    };
};