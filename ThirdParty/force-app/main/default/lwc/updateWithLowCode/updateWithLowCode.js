import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';

export default class UpdateWithLowCode extends LightningElement {

    @api recordId;
   // @api objectApiName;


    accountName;
    accountPhone;

    handleChange(event){
        if(event.target.label==='Enter Account Name'){
            this.accountName=event.target.value;
            console.log('Account Name: '+this.accountName);
        }
        if(event.target.label==='Enter Account Phone'){
            this.accountPhone=event.target.value;
            console.log('Account Phone: '+this.accountPhone);
        }

    }

    handleClick(){
        const fields={};
        fields['Id']=this.recordId;
        fields['Name']=this.accountName;
        fields['Phone']=this.accountPhone;
        const recordInput={fields};

        updateRecord(recordInput)
            .then(account=>{
                this.showToast('Success', 'Account updated with Id: ' + account.id, 'success');
                console.log('Account updated with Id: ' + account.id);

            }).catch(error=>{
                this.showToast('Error updating record', error.body.message, 'error');
                console.log('Error updating record: ' + error.body.message);
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