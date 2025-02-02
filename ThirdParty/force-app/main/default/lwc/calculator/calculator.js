import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

    firstNumber=0;
    secondNumber=0;
    result;
    handleFirstNumberChange(event) {
        this.firstNumber = event.target.value;
    }

    handleSecondNumberChange(event) {
        this.secondNumber = event.target.value;
    }

    handleAdd() {
        this.result = (Number.parseFloat(this.firstNumber) + Number.parseFloat(this.secondNumber)).toFixed(2);
        console.log('Add',this.result);
    }

    handleSub() {
        this.result = (Number.parseFloat(this.firstNumber) - Number.parseFloat(this.secondNumber)).toFixed(2);
        console.log('Subtract',this.result);
    }

    handleMul() {
        this.result = (Number.parseFloat(this.firstNumber) * Number.parseFloat(this.secondNumber)).toFixed(2);
        console.log('Multiply',this.result);
    }

    handleDiv() {
        this.result = (Number.parseFloat(this.firstNumber) / Number.parseFloat(this.secondNumber)).toFixed(2);
        console.log('Division',this.result);
    }

}