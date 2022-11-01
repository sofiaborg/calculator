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
	}

	chooseOperand(operand) {
		// const operators = this.previousContent
		// 	.split(/[^-|+|\÷|\×]/)
		// 	.filter((e) => e);

		// //om current-content inte innehåller ett nr, ska man ej kunna klicka på operand
		// operators.forEach((operator) => {
		// 	if (
		// 		this.previousContent.charAt(this.previousContent.length - 1) ===
		// 		operator
		// 	) {
		// 		operand = "";
		// 	}
		// });

		if (this.currentContent == "" && this.previousContent == "") {
			this.operand = "";

			//om man redan har klickat på en operand ska man inte kunna klcka igen
		} else {
			//operanden från Class Calc sätts till vaiablen operand, som innehåller det operand man klickat på (+,-,/,*)
			this.operand = operand;
			//när man klickar på en operand så sätts previous content till de siffror som tidigare låg i current (som sattes i appendNumber-funktionen)
			this.previousContent =
				this.previousContent + this.currentContent + operand;
			//current blir tomt i väntan på att ytteliga siffror ska klickas på
			this.currentContent = "";
		}
	}

	calculate() {
		let result;
		//convert from string to float digit
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
		this.previousContent = this.previousContent + this.currentContent;
		this.currentContent = result;
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

//create new Calc-object and add eventlisteners to the different buttons... A BIT LIKE STATE YO?!
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
