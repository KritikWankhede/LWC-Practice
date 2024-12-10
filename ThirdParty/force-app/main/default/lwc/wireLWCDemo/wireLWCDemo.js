import { LightningElement ,wire} from 'lwc';
import getAccountList from '@salesforce/apex/AccountList.getAccountList';
export default class WireLWCDemo extends LightningElement {

    accListType;

    @wire(getAccountList)
    accList;

    @wire(getAccountList)
    accHandler({data,error}){
        if(data){
            this.accListType=data.map(item=>{
                let newType= item.Type==='Customer - Direct' ? 'Direct' :
                item.Type==='Customer - Channel' ? 'Channel' : '-------';
                return {...item,newType};
            });
        }
        if(error){
            console.log(error);
        }
    }
}