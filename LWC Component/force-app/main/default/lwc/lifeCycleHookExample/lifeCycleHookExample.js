import { LightningElement } from 'lwc';

export default class LifeCycleHookExample extends LightningElement {

    constructor(){
        super();
        console.log('The parent constructor is called');
    }

    connectedCallback(){
        console.log('Parent connected callback called');
    }
}