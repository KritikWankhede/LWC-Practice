import { LightningElement ,track,wire} from 'lwc';
import getBloodCampaignDetails from '@salesforce/apex/BloodCampaign.getBloodCampaignDetails';
export default class WireBloodBankCampaign extends LightningElement {
    @track showDetails=false;
    @track ck=false;
    @track res;
    @track err;
    @track columns=[
        {label:'Campaign Id',fieldName:'Name'}, 
        {label:'Name',fieldName:'Campaign_Name__c'},
        {label:'Email',fieldName:'Email_Id__c'},
        {label:'Start Date',fieldName:'Start_Date__c'},
        {label:'End Date',fieldName:'End_Date__c'},
        {label:'Contact Number',fieldName:'Contact_Number__c'},
        {label:'Venue',fieldName:'Venue__c'}
    ];

    @wire (getBloodCampaignDetails) campaigns({data, error}){
        if(data) {
            this.res = data;
        }
        else {
            this.err = error;
        }
    }

    handleShow(){
        this.ck=true;
    }
    handleClose(){
        this.ck=false;
    }

}