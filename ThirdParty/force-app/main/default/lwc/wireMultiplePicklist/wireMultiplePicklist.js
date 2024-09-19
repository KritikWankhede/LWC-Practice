import { LightningElement , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import CONTACT_OBJ from '@salesforce/schema/Contact';

export default class WireMultiplePicklist extends LightningElement {

    ratingOptions;
    industryOptions;

    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJ})
    objectInfo

    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT_OBJ,
        recordTypeId:'$objectInfo.data.defaultRecordTypeId'})
    picklistHandler({data,error}){
        if(data){
            this.ratingOptions = this.picklistGenerator(data.picklistFieldValues.Rating);
            this.industryOptions = this.picklistGenerator(data.picklistFieldValues.Industry);
            console.log('Inside picklistHandler');
            console.log(data);
            
        }
        if(error){
            console.log(error);
        }
    }

    picklistGenerator(data){
        return data.values.map(item=>{
            return {label:item.label,value:item.value}
        });
    }

    handleChange(event){
        console.log(event.target.name+'--->'+event.target.value);
    }
}