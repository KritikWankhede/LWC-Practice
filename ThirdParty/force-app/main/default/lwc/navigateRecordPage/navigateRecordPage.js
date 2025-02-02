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

        });
        console.log("Navigate to Record Page");
    }
    /*
    Added to check thw navigation


    */
    navigateToEditRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:"001dM00000LliPiQAJ",
                objectApiName:'Account',
                actionName:'edit'
            }

        })
        console.log("Navigate to Edit Record Page");
    }
    
}