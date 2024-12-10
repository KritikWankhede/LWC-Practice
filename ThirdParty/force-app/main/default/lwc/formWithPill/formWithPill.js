import { LightningElement } from 'lwc';

export default class FormWithPill extends LightningElement {

    showInfo;

    onClickHandler(){
        this.showInfo = 'It is Clicked.';
    }

}