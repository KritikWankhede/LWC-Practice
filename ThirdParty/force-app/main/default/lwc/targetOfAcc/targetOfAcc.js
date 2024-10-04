import { LightningElement, track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'AnnualRevenue', fieldName: 'AnnualRevenue' },
    { label: 'Industry', fieldName: 'Industry' }
];

export default class TargetOfAcc extends NavigationMixin(LightningElement) {
    @track cols = columns;
    @api accountDetails;

    // connectedCallback() {
    //     this.loadDetials()
    // }
    // loadDetials(){
    //     this.accountDetails = NavigationMixin.getParams().accountDetails;
    // }
    connectedCallback() {
        console.log(this.accountDetails);
    }
}
