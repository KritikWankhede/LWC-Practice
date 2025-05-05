import { LightningElement,wire } from 'lwc';
import {publish,subscribe,MessageContext} from 'lightning/messageService';
import Component_Communication from '@salesforce/messageChannel/ComponentCommunicationChannel__c';
import Component_CommunicationB from '@salesforce/messageChannel/ComponentCommunicationChannelB__c';
export default class DirectConversationB extends LightningElement {


    receivedMesssage='Yet To receive any Messages';

    @wire(MessageContext)
    messageContext;

    messageToSend;

    handleChange(event){
        this.messageToSend=event.target.value;
    }

    handleClick(){
        const payLoad={message:this.messageToSend};
        publish(this.messageContext,Component_CommunicationB,payLoad);
    }


    connectedCallback(){
        subscribe(this.messageContext,Component_Communication,(message)=>this.handleMessage(message));
    }

    handleMessage(message){
        console.log('Message Received',message);
        this.receivedMesssage=message.message;
    }

}