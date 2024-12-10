import { LightningElement , api} from 'lwc';
//import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import LightningAlert from "lightning/alert";
import Donor__c from '@salesforce/schema/Donor__c';

import Donor_Name__c from '@salesforce/schema/Donor__c.Donor_Name__c';
import Donation_Date__c from '@salesforce/schema/Donor__c.Donation_Date__c';
import Email_Id__c from '@salesforce/schema/Donor__c.Email_Id__c';
import Gender__c from '@salesforce/schema/Donor__c.Gender__c';
// import Status__c from '@salesforce/schema/Donor__c.Status__c';
import Weight__c from '@salesforce/schema/Donor__c.Weight__c';
import Aadhar_Card_Number__c from '@salesforce/schema/Donor__c.Aadhar_Card_Number__c';
import Blood_Bank_Campaign_Id__c from '@salesforce/schema/Donor__c.Blood_Bank_Campaign_Id__c';
import Age__c from '@salesforce/schema/Donor__c.Age__c';
import Contact_Number__c from '@salesforce/schema/Donor__c.Contact_Number__c';

export default class DonorForm extends LightningElement {
    @api objectApiName=Donor__c;
    @api fields=[Donor_Name__c,Donation_Date__c,Email_Id__c,Contact_Number__c,
                    Blood_Bank_Campaign_Id__c,Gender__c,
                    Weight__c,Aadhar_Card_Number__c,Age__c,
                    ];
    
    // handleSuccess(){
        
    //     this.dispatchEvent(
    //         new ShowToastEvent({
    //             title:'Donor Details are Successfully Submitted',
    //             subject:'Our Staff will contact you Shortly.Thank You',
    //             variant:'Success'
    //     }));
    // }
    // handleError(){
    //     this.dispatchEvent(
    //         new ShowToastEvent({
    //             title:'Error Occured Enter Data Properly',
    //             subject:'Error Occured',
    //             variant:'error'
    //         })
    //     );
    // }
     handleAlertClick() {
        LightningAlert.open({
          message: "Enter the Data Properly.",
          theme: "error", // a red theme intended for error states
          label: "Error!", // this is the header text
        });
        // alert notification has been closed
      }

      handleSuccessClick() {
        LightningAlert.open({
          message: "Thank You Donation.",
          theme: "success", // a red theme intended for error states
          label: "Saved!", // this is the header text
        });
        // alert notification has been closed
      }
}