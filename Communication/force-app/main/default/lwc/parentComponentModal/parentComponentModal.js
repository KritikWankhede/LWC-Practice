import { LightningElement } from 'lwc';

export default class ParentComponentModal extends LightningElement {
    ck=false;
    onclickHandle(){
        this.ck=true;
    }
    closeHandler(){
        this.ck=false;
    }
}