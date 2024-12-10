import { LightningElement , track} from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Blood_Request__c from '@salesforce/schema/Blood_Request__c';
import {LightningAlert} from 'lightning/alert';
import Patient_Name__c from '@salesforce/schema/Blood_Request__c.Patient_Name__c';
import Email_Id__c from '@salesforce/schema/Blood_Request__c.Email_Id__c';
import Gender__c from '@salesforce/schema/Blood_Request__c.Gender__c';
import Hospital_Name__c from '@salesforce/schema/Blood_Request__c.Hospital_Name__c';
import Mobile_Number__c from '@salesforce/schema/Blood_Request__c.Mobile_Number__c';
import State__c from '@salesforce/schema/Blood_Request__c.State__c';
import Area__c from '@salesforce/schema/Blood_Request__c.Area__c';
import Blood_Bank_Id__c from '@salesforce/schema/Blood_Request__c.Blood_Bank_Id__c';
import Blood_Group__c from '@salesforce/schema/Blood_Request__c.Blood_Group__c';
import Blood_Quantity_Required__c from '@salesforce/schema/Blood_Request__c.Blood_Quantity_Required__c';

export default class RequestForm extends LightningElement {
    @track objectApiName = Blood_Request__c;
    @track selectedFields = [Patient_Name__c,Email_Id__c,Gender__c,Hospital_Name__c,
                    Mobile_Number__c,State__c,Area__c,Blood_Bank_Id__c,Blood_Group__c,
                    Blood_Quantity_Required__c];

    // handleSuccess(){
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Request Made Successfully.',
    //                 message: 'Our Staff will be contacting you shortly.',
    //                 variant: 'success',
    //                 mode: 'pester'
    //             }
    //         ));
    // }
    // handleError(){
    //     this.dispatchEvent(
    //         new ShowToastEvent({
    //             title:'Error Occured Enter Data Properly',
    //             subject:'Error Occured',
    //             variant:'error',
    //             mode: 'pester'
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