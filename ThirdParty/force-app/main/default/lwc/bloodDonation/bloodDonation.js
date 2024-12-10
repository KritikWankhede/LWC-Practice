import { LightningElement ,track} from 'lwc';
import canDonate from '@salesforce/apex/BloodDonationController.canDonate';
export default class BloodDonation extends LightningElement {
    @track aadharNumber = '';
    @track message = '';
    @track showForm = false;
    
    handleInputChange(event) {
        this.aadharNumber = event.target.value;
    }
 
    handleCheckEligibility() {
        canDonate({ aadharNumber: this.aadharNumber })
            .then(result => {
                if (result) {
                    this.message = 'You can donate blood.';
                    this.showForm = true;
                } else {
                    this.message = 'You can donate blood after 90 days from the previous donation date.';
                    this.showForm = false;
                }
            })
            .catch(error => {
                console.error('Error: ', error);
                this.message = 'An error occurred while checking eligibility.';
                this.showForm = false;
            });
    }
}