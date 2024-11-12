import { LightningElement ,wire} from 'lwc';
import getAccountListCSV from '@salesforce/apex/AccountList.getAccountListCSV';
import {exportCSVFile} from 'c/utils';
export default class ZTHCSVDemo extends LightningElement {
    accountData
    accountHeaders={
        Id:"Record Id",
        Name:"Name",
        AnnualRevenue:"Annual Revenue",
        Industry:"Industry",
        Phone:"Phone"
    }
    @wire(getAccountListCSV)
    accountHandler({data, error}){
        if(data){
            console.log(data)
            this.accountData = data
        }
        if(error){
            console.error(error)
        }
    }

    csvGenerator(){
        //headers, totalData, fileTitle
        exportCSVFile(this.accountHeaders, this.accountData, "account_records")
    }
}