import { LightningElement } from 'lwc';
import getAccountListCSV from '@salesforce/apex/AccountList.getAccountListCSV';
import {exportCSVFile} from 'c/utils';
export default class CsvDemo extends LightningElement {
    
    accountList;
    ck=false;
    accountHeader={
        Id:'Record Id',
        Name:'Account Name',
        AnnualRevenue:'Annual Revenue',
        Type:'Account Type',
        Industry:'Account Industry'
    };
    // @wire(getAccountListCSV)
    // wiredRecord({data,error}){
    //     if(data){
    //         console.log('Account List:-');
    //         console.log(data);
    //         this.accountList=data;
    //     }
    //     if(error){
    //         console.error(error);
    //     }
    // }
    columns=[
        {label:'Account Name',fieldName:'Name'},
        {label:'Account Type',fieldName:'Type'},
        {label:'Account Industry',fieldName:'Industry'},
        {label:'Account Annual Revenue',fieldName:'AnnualRevenue'}
    ]
    connectedCallback(){
        this.handleAccount();

    }

    handleAccount(){
        getAccountListCSV().then(data=>{
            console.log(data);
            if(data!==null){
                this.ck=true;
            }
            this.accountList=data;
        }).catch(error=>{
            console.error(error);
        });
    }

    generateCSV(){
        // headers,data,fileTitle
        console.log('Inside generateCSV');
        exportCSVFile(this.accountHeader,this.accountList,'Account_Records');
    }
    
}