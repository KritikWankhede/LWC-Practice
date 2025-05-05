import { LightningElement } from 'lwc';

export default class ParentComponetA extends LightningElement {

    message='';


    handleChange(event){
        this.message=event.target.value;
    }

    
}