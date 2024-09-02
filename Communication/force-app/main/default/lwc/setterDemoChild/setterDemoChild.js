import { LightningElement,api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
    userDetails;

    @api
    set details(data){
        let newName='Hello '+data.name ;
        this.userDetails={...data,name:newName,'location':'Liverpool'};
    }
    get details(){
        return this.userDetails;
    }
}