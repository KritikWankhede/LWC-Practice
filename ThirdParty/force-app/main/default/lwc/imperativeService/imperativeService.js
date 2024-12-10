import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountList.getAccountList';
export default class ImperativeService extends LightningElement {

    accountsList;

    handleClick(){
        getAccountList().then(result=>{
            console.log('Inside handleClick');
            console.log(result);
            this.accountsList=result;
        }).catch(error=>{
            console.log(error);
        })
    }

}