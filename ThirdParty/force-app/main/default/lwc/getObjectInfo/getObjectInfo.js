import { LightningElement ,wire} from 'lwc';
import {getObjectInfo,getObjectInfos} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import CONTACT_OBJ from '@salesforce/schema/Contact';
export default class GetObjectInfo extends LightningElement {
    
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    defaultRecordTypeIdProp;


    objectApiNames=[ACCOUNT_OBJ,CONTACT_OBJ];
    objectInfos;
    @wire(getObjectInfos,{objectApiNames:'$objectApiNames'})
    objectInfosHandler({data}){
        if(data){
            console.log('Inside objectInfosProp function in wire.')
            console.log(data);
            this.objectInfos=data;
            console.log(this.objectInfos);
        }
    }
    
}