import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class DateValidation extends LightningElement {
    startDate;
    endDate;
    handleDate(event){
        if(event.target.name==='startDate'){
            this.startDate=event.target.value;
        }else{
            this.endDate=event.target.value;
        }
    }
    submitHandler(){
        if(this.startDate>this.endDate){
            const eve=new ShowToastEvent({
                title:'Date Validation',
                message:'Start Date should be less than End Date',
                variant:'error',
                mode:'dismissable'
            })
            this.dispatchEvent(eve);
        }
        else{
            console.log('Valid Dates');
        }
    }
}