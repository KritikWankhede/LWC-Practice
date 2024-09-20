import { LightningElement } from 'lwc';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import ANNUAL_REV from '@salesforce/schema/Account.AnnualRevenue';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LdsRecordFrom extends LightningElement {
    objectApiName = ACCOUNT_OBJ;
    fields = [NAME_FIELD, PHONE_FIELD, TYPE_FIELD, ANNUAL_REV];
    successHandler(event){
        console.log(event.detail.id);
        const eve=new ShowToastEvent({
            title: 'Success',
            message: 'Account created with ID:- '+event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(eve);
    }
}