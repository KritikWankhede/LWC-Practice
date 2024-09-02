import { LightningElement } from 'lwc';

export default class ParentComponentModal extends LightningElement {
    ck=false;
    msg='';
    onclickHandle(){
        this.ck=true;
    }
    closeHandler(event){
        this.msg=event.detail;
        this.ck=false;
    }
}