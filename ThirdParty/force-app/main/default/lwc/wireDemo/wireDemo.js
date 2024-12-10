import { LightningElement,wire } from 'lwc';
import ID from '@salesforce/user/Id';
import {getRecord} from 'lightning/uiRecordApi';
import Name_FIELD from '@salesforce/schema/User.Name';
import Email_FIELD from '@salesforce/schema/User.Email';
import Phone_FIELD from '@salesforce/schema/User.Phone';
const fields=[Name_FIELD,Email_FIELD,Phone_FIELD];
export default class WireDemo extends LightningElement {
    userId=ID;
    //005dM000005oGGPQA2
    userDetails;
    @wire(getRecord,{recordId:'$userId',fields})
    userDetailHandler({data,error}){
        if(data){
            this.userDetails=data.fields;
        }
        else if(error){
            console.log(error);
        }
    }
    @wire(getRecord,{recordId:'$userId',fields})
    userDetailsProperty;

}