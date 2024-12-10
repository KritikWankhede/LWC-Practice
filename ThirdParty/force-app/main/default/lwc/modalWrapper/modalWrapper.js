import { LightningElement } from 'lwc';

export default class ModalWrapper extends LightningElement {
    isOpen=false;
    onclickHandler(){
        console.log('The button is clicked');
        this.isOpen=true;
    }
    closeModal(){
        this.isOpen=false;
    }
}