import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavigateToWeb extends NavigationMixin(LightningElement) {
    navToWeb(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'https://fontawesome.com'
            }
        });
    }
}