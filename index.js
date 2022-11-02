//TODO
//gör previous till endast en variabel. Du behöver inte skriva ut previous i domen

class Calc {
	constructor(constructorPrevious, constructorCurrect) {
		this.constructorPrevious = constructorPrevious;
		this.constructorCurrect = constructorCurrect;
		this.clearAll();
	}

	clearAll() {
		this.previousContent = "";
		this.currentContent = "";
		this.operand = undefined;
	}

	appendNumber(number) {
		if (number === "." && this.currentContent.includes(".")) return;
		this.currentContent = this.currentContent + number;

		const operators = this.previousContent
			.split(/[^-|+|\÷|\×]/)
			.filter((e) => e);

		operators.forEach((operator) => {
			if (
				this.previousContent.charAt(this.previousContent.length - 1) ===
				operator
			) {
				this.calculate();
			}
		});
	}

	chooseOperand(operand) {
		this.operand = operand;
		this.previousContent = this.previousContent + this.currentContent + operand;
		//current becomes empty each time you click on a operand
		this.currentContent = "";
	}

	calculate() {
		let result;
		//convert from string to a float point number - WHAT'S THE DIFFERENCE IF I USE PARSEINT? WORKS THE SAME?..
		const prev = parseFloat(this.previousContent);
		const curr = parseFloat(this.currentContent);
		//check if theres anything to calculate
		if (isNaN(prev) || isNaN(curr)) return;

		//do a bunch of if-states on the object OPERAND
		switch (this.operand) {
			case "+":
				result = prev + curr;
				break;
			case "-":
				result = prev - curr;
				break;
			case "÷":
				result = prev / curr;
				break;
			case "×":
				result = prev * curr;
				break;

			//default = else-state
			default:
				return;
		}
		console.log(result);
		this.previousContent = result;
		this.currentContent = "";
		this.operand = undefined;
	}

	updateDisplay() {
		this.constructorCurrect.innerText = this.currentContent;
		this.constructorPrevious.innerText = this.previousContent;
	}
}

let numberBtns = document.querySelectorAll("[class^=number]");
let operandBtns = document.querySelectorAll("[class^=operand]");
let equalBtn = document.querySelector(".calc-equal");
let clearBtn = document.querySelector(".calc-clear");
let previousToConstructor = document.querySelector(".previous");
let currentToConstructor = document.querySelector(".current");

//create new Calc-object and add eventlisteners to the different buttons
const calculator = new Calc(previousToConstructor, currentToConstructor);

//number-buttons
numberBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.appendNumber(btn.innerText);
		calculator.updateDisplay();
	});
});

//operand-buttons
operandBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.chooseOperand(btn.innerText);
		calculator.updateDisplay();
	});
});

//clear-button
clearBtn.addEventListener("click", () => {
	calculator.clearAll();
	calculator.updateDisplay();
});

//equal-button
equalBtn.addEventListener("click", () => {
	calculator.calculate();
	calculator.updateDisplay();
});
