import { LightningElement } from 'lwc';
import pubSub from '../pubSub/pubSub';
export default class PubSubComponentB extends LightningElement {

    message;
    connectedCallback(){
       this.callSubscriber();
    }
    callSubscriber(){
        pubSub.subscribe('ComponentA',function(message){
            this.message=message;
        })
    }
    


}