import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import Name from '@salesforce/schema/Opportunity.Name';
import StageName from '@salesforce/schema/Opportunity.StageName';
import Amount from '@salesforce/schema/Opportunity.Amount';
import CloseDate from '@salesforce/schema/Opportunity.CloseDate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CustomOpp extends LightningElement {
    showError = false;
    fields = {};
    checkEvery = false;

    handleChange(event) {
        if (event.target.label === 'Opportunity Name') {
            this.fields[Name.fieldApiName] = event.target.value;
           // console.log('Name:', this.fields[Name.fieldApiName]);
        }
        if (event.target.label === 'Stage') {
            this.fields[StageName.fieldApiName] = event.target.value;
           // console.log('Stage:', this.fields[StageName.fieldApiName]);
        }
        if (event.target.label === 'Amount') {
            this.fields[Amount.fieldApiName] = event.target.value;
            //console.log('Amount:', this.fields[Amount.fieldApiName]);
        }
    }

    handleCloseDate(event) {
        let ipdate = new Date(event.target.value);
        ipdate.setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        if (ipdate < today) {
            this.showError = true;
            this.fields[CloseDate.fieldApiName] = null;

        } else {
            this.showError = false;
            this.fields[CloseDate.fieldApiName] = event.target.value;
            this.checkEvery = false;
        }
    }

    async handleSave() {
        const recordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields: this.fields };

        try {
            if (this.showError === false) {
                const opp = await createRecord(recordInput);
                this.checkEvery = false;
                this.handleToastEvent('Opportunity Created', 'success');

            } else {
                this.checkEvery = true;
            }
        } catch (error) {
            console.error('Error ', error);
            this.handleToastEvent(error.body.message, 'error');
        }
    }

    handleToastEvent(message,variant){
        this.dispatchEvent(new ShowToastEvent({
            message: message,
            variant: variant
        }));
        //this.dispatchEvent(eve);
    }
}
