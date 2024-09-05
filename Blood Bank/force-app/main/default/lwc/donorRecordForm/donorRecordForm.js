import { LightningElement,track } from 'lwc';
import findDonorByAadhar from '@salesforce/apex/DonorController.findDonorByAadhar';

export default class DonorRecordForm extends LightningElement {
    @track aadharCard;
    @track donorRecordId;
 
    handleAadharChange(event) {
        this.aadharCard = event.target.value;
    }
 
    handleSearch() {
        if (this.aadharCard) {
            findDonorByAadhar({ aadharCard: this.aadharCard })
                .then(result => {
                    if (result) {
                        this.donorRecordId = result.Id;
                    } else {
                        this.donorRecordId = null;
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.donorRecordId = null;
                });
        }
    }
}