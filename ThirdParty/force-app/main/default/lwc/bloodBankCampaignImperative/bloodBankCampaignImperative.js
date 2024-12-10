import { LightningElement ,track} from 'lwc';
import getBloodCampaignDetails from '@salesforce/apex/BloodCampaign.getBloodCampaignDetails'
export default class BloodBankCampaignImperative extends LightningElement {

    @track res;
    @track err;
    @track ck=false;
    @track column=[
        {label:'Campaign Id',fieldName:'Name'},
        
        {label:'Name',fieldName:'Campaign_Name__c'},
        {label:'Email',fieldName:'Email_Id__c'},
        {label:'Start Date',fieldName:'Start_Date__c'},
        {label:'End Date',fieldName:'End_Date__c'},
        {label:'Contact Number',fieldName:'Contact_Number__c'},
        {label:'Venue',fieldName:'Venue__c'}
    ];
    handleClickClose(){
        this.ck=false;
    }
    handleClick(){
        this.ck=true;
        getBloodCampaignDetails().then(data => {
            this.res = data;
        })
        .catch(error => {
            this.err=error;
            console.log(error.getMessage());
        })
    }
}