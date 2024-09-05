import { LightningElement } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class AccessFormFactor extends LightningElement {
    
    isDesktop = FORM_FACTOR === 'Large';
    isTablet = FORM_FACTOR === 'Medium';
    isMobile = FORM_FACTOR === 'Small';

}