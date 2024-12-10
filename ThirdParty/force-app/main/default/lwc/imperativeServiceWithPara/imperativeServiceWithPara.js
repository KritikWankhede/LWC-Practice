import { LightningElement } from 'lwc';
import getAccountListKey from '@salesforce/apex/AccountList.getAccountListKey'
export default class ImperativeServiceWithPara extends LightningElement {
    acc;
    accName='';
    timer;
    handleNameChange(event){
        window.clearTimeout(this.timer);
        this.accName=event.target.value;
        this.timer=setInterval(()=>{
                this.callApex();
        },2000);
    }

    callApex(){
        getAccountListKey({key:this.accName}).then(result=>{
            console.log('Inside handleClick')
            console.log(result);
            this.acc=result;
        }).catch(error=>{
            console.log(error);
        });
    }

}