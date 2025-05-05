import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
export default class RecordUiApiTest extends NavigationMixin(LightningElement) {

    accountName;
    accountNumber;
    handleChange(event){
        if (event.target.label === 'Enter Account Name') {
            this.accountName = event.target.value;
            console.log('Account Name: ' + this.accountName);
        }
        if (event.target.label === 'Enter Account Phone') {
            this.accountNumber = event.target.value;
            console.log('Account Phone: ' + this.accountNumber);
        }
    }
    
    handleClick(){
        const fields = {};
        fields[ACCOUNT_NAME_FIELD.fieldApiName] = this.accountName;
        fields[ACCOUNT_PHONE_FIELD.fieldApiName] = this.accountNumber;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.showToast('Success', 'Account created with Id: ' + account.id, 'success');
                console.log('Account created with Id: ' + account.id);
                this.navigateToRecordViewPage(account.id);
            })
            .catch(error => {
                this.showToast('Error creating record', error.body.message, 'error');
            });
        
    }
    navigateToRecordViewPage(recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: ACCOUNT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }
}