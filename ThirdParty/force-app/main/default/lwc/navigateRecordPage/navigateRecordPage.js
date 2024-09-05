import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavigateRecordPage extends NavigationMixin(LightningElement) {
    @api recordId;
    navigateToRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:"001dM00000LliPiQAJ",
                objectApiName:'Account',
                actionName:'view'
            }

        })
    }
    navigateToEditRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:"001dM00000LliPiQAJ",
                objectApiName:'Account',
                actionName:'edit'
            }

        })
    }
    
}