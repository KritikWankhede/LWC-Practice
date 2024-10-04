import { LightningElement } from 'lwc';
// import { NavigationMixin} from 'lightning/Navigation';
import {NavigationMixin} from 'lightning/navigation';
import fetchAccount from '@salesforce/apex/AccountList.fetchAccount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AccountNavigation extends NavigationMixin(LightningElement) {

    accountName = '';
    accountDetails;
    accountNameHandler(event){
        this.accountName = event.target.value;
    }    

    handleClick(){
        fetchAccount({accName:this.accountName}).then(result=>{
            this.accountDetails=result;
            if(result.length>0){
                this.navigateToAccountDetail();
            }else{

                const eve=new ShowToastEvent({
                        title: 'No Account Found',
                        message: 'No Such Account Exist',
                        variant: 'error',
                });
                this.dispatchEvent(eve);
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    navigateToAccountDetail(){

        var defination ={
            componentDef:'c:targetOfAcc',
            attributes:{
                accountDetails:this.accountDetails
            }
        }

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        });
    }
    
}