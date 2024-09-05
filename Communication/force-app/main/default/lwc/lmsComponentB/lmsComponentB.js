import { LightningElement,wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/sampleMessage__c';
import { subscribe,MessageContext, APPLICATION_SCOPE ,unsubscribe} from 'lightning/messageService';
export default class LmsComponentB extends LightningElement {
    receviedValue;
    subscription;
    @wire(MessageContext)
    context;

    subscribeMessage(){
       this.subscription= subscribe(this.context,SAMPLEMC,message=>{this.handleMessage(message)},{Scope:APPLICATION_SCOPE});
    }

    connectedCallback(){
        this.subscribeMessage();
    }

    handleMessage(message){
        this.receviedValue=message.lmsData.value ? message.lmsData.value : 'No message Published';
    }
    unsubscribeHandler(){
        unsubscribe(this.subscription);
        this.subscription=null;
        
    }
}