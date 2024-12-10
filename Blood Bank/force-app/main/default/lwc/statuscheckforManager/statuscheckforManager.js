import { LightningElement,wire,track } from 'lwc';
import statusReport from '@salesforce/apex/StatusOfBloodRequest.statusReport';
export default class StatuscheckforManager extends LightningElement {
    
    @track selectedValue="";
    get Options(){
    console.log('Inside typeOptions');
        return [
            {label:'Requested',value:'Requested'},
            {label:'Approved',value:'Approved'},
            {label:'Not Approved',value:'Not Approved'}
        ];
    }

    @wire(statusReport,{statusReq:'$selectedValue'})filteredReq
    typeHandler(event)
    {
        console.log('Inside typeHandler');
        this.selectedValue=event.target.value;
        console.log(this.selectedValue);
    }
}