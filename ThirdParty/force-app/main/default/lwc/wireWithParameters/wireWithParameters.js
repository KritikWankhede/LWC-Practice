import { LightningElement ,wire} from 'lwc';
import getFilterAccountList from '@salesforce/apex/AccountList.getFilterAccountList'
export default class WireWithParameters extends LightningElement {

    selectedType='';

    @wire(getFilterAccountList,{filterType:'$selectedType'})
    filteredAccount;
    
    get typeOptions(){
        return [
            {label:'Customer - Direct',value:'Customer - Direct'},
            {label:'Customer - Channel',value:'Customer - Channel'}
        ];
    }

    handleTypeChange(event){
        this.selectedType=event.target.value;
    }
}