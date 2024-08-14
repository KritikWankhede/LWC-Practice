import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/sampleMessage__c';
//import SAMPLEMCJS from '@salesforce/resourceUrl/SAMPLEMCJS';
import { MessageContext,publish } from 'lightning/messageService';
export default class LmsComponentA extends LightningElement {

    inputValue;

    @wire(MessageContext)
    context;

    inputHandler(event){
        this.inputValue=event.target.value;
    }

    onClickHandler(){
        const message={
            lmsData:{
                value:this.inputValue
            }
        }
        publish(this.context, SAMPLEMC, message);
    }
    
}