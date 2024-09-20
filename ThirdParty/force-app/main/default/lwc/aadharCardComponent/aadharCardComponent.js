import { LightningElement,track } from 'lwc';
import getDonorByAadhar from '@salesforce/apex/DonorController.getDonorByAadhar';
import updateDonorDetails from '@salesforce/apex/DonorController.updateDonorDetails';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import {LightningAlert} from 'lightning/alert';
export default class AadharCardComponent extends LightningElement {
    @track aadharCard = '';
    donor;
    //@track message = '';
    @track newDonor = false;
    @track isEligible = false;
    @track newDonationDate = '';
    @track campaignId = '';
    @track age = '';
    aadhaar_regex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    handleAadharChange(event) {
        this.aadharCard = event.target.value;
        console.log(this.aadharCard);
    }
 
    async handleAadharCheck() {
        if (this.aadharCard.length === 12 && this.aadhaar_regex.test(this.aadharCard)) {
            console.log('Inside');
            getDonorByAadhar({ aadharCard: this.aadharCard })
                .then((result) => {
                    console.log(result);
                    this.donor = result;
                    console.log(this.donor);
                    if (this.donor) {
                        const lastDonationDate = new Date(this.donor.Donation_Date__c);
                        console.log(lastDonationDate);
                        const daysSinceLastDonation = Math.floor((new Date() - lastDonationDate) / (1000 * 60 * 60 * 24));
                        if (daysSinceLastDonation < 90) {
                            //this.message = 'You can donate after 90 days.';
                            
                            console.log(daysSinceLastDonation);
                            let dateToShow=90-daysSinceLastDonation;
                            
                            
                            // eslint-disable-next-line no-alert
                            alert(`You can donate after ${dateToShow} days of previous donation date.`);
                            // LightningAlert.Open({
                            //     message: `You can donate after  90 days`,
                            //     label: 'Error !',
                            //     theme: 'Error'
                            // });
                            this.isEligible = false;
                            // let evt = new ShowToastEvent({
                            //     title:'Alert', 
                            //     message: `You can donate after ${dateToShow} days.`,
                            //     theme: "error",
                            //     mode:'Error'
                            // });
                            // this.dispatchEvent(evt);
                            
                        } else {
                           // this.message = 'You can donate';
                           // eslint-disable-next-line no-alert
                           this.isEligible = true;
                           // eslint-disable-next-line no-alert
                           alert('You can donate.');
                            
                        }
                    } else {
                        //this.message = 'Register for donation.';
                        this.isEligible = false;
                        this.newDonor = true;
                        // eslint-disable-next-line no-alert
                        alert('You are a new user. Please enter your details');
                        // let evt = new ShowToastEvent({
                        //     title:'Info', 
                        //     message: 'You are a new user. Please enter your details',
                        //     mode: 'info',
                        // });
                        // this.dispatchEvent(evt);
                        // LightningAlert.Open({
                        //     message: `You are a new user. Please enter your details`,
                        //     label: 'Info !',
                        //     theme: 'Info'
                        // });
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('outside');
            // let evte = new ShowToastEvent({
            //     title:'Error', 
            //     message: 'Please enter a valid 12-digit Aadhar card number.',
            //     mode: 'error',
            // });
            // this.dispatchEvent(evte);
            // LightningAlert.Open({
            //     message: `Please enter a valid 12-digit Aadhar card number.`,
            //     label: 'Error !',
            //     theme: 'error',
            // });
            
            
            // eslint-disable-next-line no-alert
            //alert('Please enter a valid 12-digit Aadhar card number.');
            this.isEligible = false;
            // eslint-disable-next-line no-alert
            alert('Please enter a valid 12-digit Aadhar card number.');
        }
    }
 
    handleInputChange(event) {
        const field = event.target.name;
            if (field === 'newDonationDate') {
                this.newDonationDate = event.target.value;
            } else if (field === 'campaignId') {
                this.campaignId = event.target.value;
            } else if (field === 'age') {
                this.age = event.target.value;
                console.log(this.age)
            }
            console.log('inside handleInput' + this.age + this.newDonationDate + this.campaignId);
    }
 
    handleUpdate() {
        updateDonorDetails({ donorId: this.donor.Id, newDonationDate: this.newDonationDate, campaignName: this.campaignId, age: parseInt(this.age, 10) })
            .then(() => {
                // this.message = 'Donor details updated successfully.';
                console.log(this.donor);
                console.log('inside updateDonorDetails');
                // LightningAlert.open({
                //     message: 'Your details are updated.',
                //     theme: 'success',
                //     label:'Success !',
                //  });
                // eslint-disable-next-line no-alert
                alert('Your details are updated.');
                // let evt = new ShowToastEvent({
                //     title:'Success', 
                //     message: 'Your details are updated.',
                //     mode: 'success',
                // });
                // this.dispatchEvent(evt);
                
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
}