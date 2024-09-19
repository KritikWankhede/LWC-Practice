import { LightningElement ,wire} from 'lwc';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class WirePicklistDemo extends LightningElement {

    selectedIndustry = '';
    industryOptions=[];
    
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    objProp;

    @wire(getPicklistValues,{recordTypeId:'$objProp.data.defaultRecordTypeId',fieldApiName:INDUSTRY_FIELD})
    valueHandler({data,error}){
            if(data){

                console.log('Inside valueHandler function in wire.');
                console.log(data);
                this.industryOptions=[...this.generatePicklist(data)];
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
        this.value = event.detail.value;
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