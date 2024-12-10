import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavigateToRelatedPage extends NavigationMixin(LightningElement) {
    
    navigateToRel(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordRelationshipPage',
            attributes:{
                recordId:'001dM00000LliPiQAJ',
                objectApiName:'Account',
                relationshipApiName:'Contacts',
                actionName:'view'
            }
        });
    }
}