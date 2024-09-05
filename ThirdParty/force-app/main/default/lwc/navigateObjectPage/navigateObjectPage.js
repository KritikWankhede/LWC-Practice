import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils';
export default class NavigateObjectPage extends NavigationMixin(LightningElement) {

    navigateToObjectPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'list'
            },
            state:{
                filterName:'All'
            }
        });
    }

    navigateToNewRecord(){
        const defaultValue=encodeDefaultFieldValues({
                Name:'Account KZTH',
                BillingCity:'San Francisco',
                BillingCountry:'USA'
        })
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'new'
            },
            state:{
                defaultFieldValues:defaultValue,
            }
        });
    }

    navigateToFiles(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'ContentDocument',
                actionName:'home'
            }
        })
    }

}