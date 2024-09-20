import { LightningElement,api,wire} from 'lwc';
import getAccountId from '@salesforce/apex/ContactAccountLookupController.getAccountId';
// const DELAY=300;
import getContactRecord from '@salesforce/apex/ContactAccountLookupController.getContactRecord';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import LEVEL from '@salesforce/schema/Contact.Level__c';

const columns=[
    {label:'First Name',fieldApiName:'FirstName'},
    {label:'Last Name',fieldApiName:'LasName'},
];

export default class ContactShowcase extends LightningElement {
    @api label = 'Enter the Account Name';
    @api placeholder = 'search...'; 
    @api iconName = 'standard:account';
    @api sObjectApiName = 'Account';
    @api defaultRecordId = '';
    // @track selectedText='';
    column=columns;
    conList=[];
    ans;
    selectedLevel = '';
    LevelOptions=[];
    // private properties 
    lstResult = []; // to store list of returned records   
    hasRecords = true; 
    searchKey=''; // to store input field value    
    isSearchLoading = false; // to control loading spinner  
    delayTimeout;
    selectedRecord = {}; // to store selected lookup record in object formate 
   // initial function to populate default selected lookup record if defaultRecordId provided  
    // connectedCallback(){
    //      if(this.defaultRecordId != ''){
    //         fetchDefaultRecord({ recordId: this.defaultRecordId , 'sObjectApiName' : this.sObjectApiName })
    //         .then((result) => {
    //             if(result != null){
    //                 this.selectedRecord = result;
    //                 this.handelSelectRecordHelper(); // helper function to show/hide lookup result container on UI
    //             }
    //         })
    //         .catch((error) => {
    //             this.error = error;
    //             this.selectedRecord = {};
    //         });
    //      }
    // }
    // wire function property to fetch search record based on user input
    @wire(getAccountId, { searchKey: '$searchKey' })
    searchResult(value) {
        const { data, error } = value; // destructure the provisioned value
        this.isSearchLoading = false;
        if (data) {
            console.log('Inside searchResult1 ');
            this.ans=data;
            console.log(this.ans[0].Id);
            console.log(data);
             this.hasRecords = data.length == 0 ? false : true; 
             this.lstResult = JSON.parse(JSON.stringify(data)); 
             console.log('Inside searchResult2');
             console.log(this.lstResult);
         }
        else if (error) {
            console.log('(error---> ' + JSON.stringify(error));
         }
    };
       
  // update searchKey property on input field change  
    handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        this.isSearchLoading = true;
        // window.preventDefault();
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
        this.searchKey = searchKey;
        }, 1000);
    }
    // method to toggle lookup result section on UI 
    toggleResult(event){
        this.selectedText=event.target.value;
        console.log(this.selectedText);
        const lookupInputContainer = this.template.querySelector('.lookupInputContainer');
        const clsList = lookupInputContainer.classList;
        const whichEvent = event.target.getAttribute('data-source');
        switch(whichEvent) {
            case 'searchInputField':
                clsList.add('slds-is-open');
               break;
            case 'lookupContainer':
                clsList.remove('slds-is-open');    
            break;                    
           }
    }
   // method to clear selected lookup record  
   handleRemove(){
    this.searchKey = '';    
    this.selectedRecord = {};
    this.lookupUpdatehandler(undefined); // update value on parent component as well from helper function 
    
    // remove selected pill and display input field again 
    const searchBoxWrapper = this.template.querySelector('.searchBoxWrapper');
     searchBoxWrapper.classList.remove('slds-hide');
     searchBoxWrapper.classList.add('slds-show');
     const pillDiv = this.template.querySelector('.pillDiv');
     pillDiv.classList.remove('slds-show');
     pillDiv.classList.add('slds-hide');
  }
  // method to update selected record from search result 
handelSelectedRecord(event){   
     var objId = event.target.getAttribute('data-recid'); // get selected record Id 
     this.selectedRecord = this.lstResult.find(data => data.Id === objId); // find selected record from list 
     console.log('Inside handelselectRecord');
     console.log(this.selectedRecord);
     this.lookupUpdatehandler(this.selectedRecord); // update value on parent component as well from helper function 
     this.handelSelectRecordHelper(); // helper function to show/hide lookup result container on UI
}
/*COMMON HELPER METHOD STARTED*/
handelSelectRecordHelper(){
    this.template.querySelector('.lookupInputContainer').classList.remove('slds-is-open');
     const searchBoxWrapper = this.template.querySelector('.searchBoxWrapper');
     searchBoxWrapper.classList.remove('slds-show');
     searchBoxWrapper.classList.add('slds-hide');
     const pillDiv = this.template.querySelector('.pillDiv');
     pillDiv.classList.remove('slds-hide');
     pillDiv.classList.add('slds-show');     
}
// send selected lookup record to parent component using custom event
    lookupUpdatehandler(value){    
    console.log('Inside lookupUpdatehandler');
    console.log(value);
    console.log('----------------------------------------');
    console.log('Inside looupdatehandler end');
    const oEvent = new CustomEvent('lookupupdate',
    {
        'detail': {selectedRecord: value}
    }
    );
    this.dispatchEvent(oEvent);
}
    getRecords(){
        console.log('Inside getRecords');
        let recId=this.ans[0].Id;
        console.log(recId);
        getContactRecord({accId:recId,optLevel: this.selectedLevel}).then(result=>{
            this.conList=result;
            console.log(this.conList);
        }).catch(error=>{
            console.log(error);
        });
    }
    
    
    @wire(getObjectInfo,{objectApiName:CONTACT_OBJ})
    objProp;

    @wire(getPicklistValues,{recordTypeId:'$objProp.data.defaultRecordTypeId',fieldApiName:LEVEL})
    valueHandler({data,error}){
            if(data){
                console.log('Inside valueHandler function in wire.');
                console.log(data);
                this.LevelOptions=[...this.generatePicklist(data)];
            }        
            else{
                if(error){
                    console.log(error);
                }
            }
    }
    
    // get options() {
    //     return [
    //         { label: 'New', value: 'new' },
    //         { label: 'In Progress', value: 'inProgress' },
    //         { label: 'Finished', value: 'finished' },
    //     ];
    // }

    handleChange(event) {
        this.selectedLevel = event.detail.value;
    }

    generatePicklist(data){
        return data.values.map(item=>(
            {
                label:item.label,
                value:item.value
            }
        ));
    }
   
}