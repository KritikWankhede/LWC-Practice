import { LightningElement ,wire} from 'lwc';
import getContactList from '@salesforce/apex/refreshContactController.getContactList';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex'

const columns=[
        {label:'First Name',fieldName:'FirstName',editable:'true'},
        {label:'Last Name',fieldName:'LastName',editable:'true'},
        {label:'Email',fieldName:'Email', type:'email'}
];

export default class RefreshDemoLwc extends LightningElement {
    columns=columns;
    draftValues=[];
    handleSave(event){
        console.log(event.detail.draftValues);
       // this.draftValues=event.detail.draftValues;
       const records=event.detail.draftValues.slice().map(item=>{
            const fields=Object.assign({},item);
            return {fields};
       });

       const promises=records.map(item=>{
            updateRecord(item);
       });

       Promise.all(promises).then(()=>{
            this.showToastMsg('Success','Contacts Updated');
            this.draftValues=[];
            return refreshApex(this.contacts);
       }).catch(error=>{
           console.log(error);
           this.showToastMsg('Error creating record',error.message,'error');
       });
    }

    showToastMsg(title,message,variant){
        const event=new ShowToastEvent({
            title:title,
            message:message,
            variant:variant || 'success'
        });
        this.dispatchEvent(event);
    }
    @wire(getContactList)
    contacts;
}