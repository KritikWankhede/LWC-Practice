import { LightningElement } from 'lwc';
import DESCRIPTION_ONE from '@salesforce/label/c.testDescription';
import DESCRIPTION_TWO from '@salesforce/label/c.testDescription2';
export default class CustomLabels extends LightningElement {
    
    Labels={
        desc:DESCRIPTION_ONE,
        descTwo:DESCRIPTION_TWO
    };
}