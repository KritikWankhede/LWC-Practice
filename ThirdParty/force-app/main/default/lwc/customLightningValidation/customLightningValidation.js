import { LightningElement } from 'lwc';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CustomLightningValidation extends LightningElement {

    objectApiName = ACCOUNT_OBJ;
    inputValue=''
    handleChange(event){
        this.inputValue=event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
        let inputCmp=this.template.querySelector('lightning-input');
        let inValue=inputCmp.value;
        if(!inValue.includes('India')){
            inputCmp.setCustomValidity('The Account Name Must Have India');
        }
        else{
            inputCmp.setCustomValidity('');
            let field=event.detail.fields;
            field.Name=inValue;
            this.template.querySelector('lightning-record-edit-form').submit(field);
        }
        inputCmp.reportValidity();
    }
    successHandler(){
        const eve=new ShowToastEvent({
        title: 'Success',
        message: 'Account Created Successfully',
        variant: 'success'
        });
        this.dispatchEvent(eve);
    }
    errorHandler(event){
        console.log('Inside Error Handler');
        console.log(event.detail.message);
        const eve=new ShowToastEvent({
        title: 'Unexpected Error Occured',
        message: event.detail.message,
        variant: 'error'
        });
        this.dispatchEvent(eve);
    }
}