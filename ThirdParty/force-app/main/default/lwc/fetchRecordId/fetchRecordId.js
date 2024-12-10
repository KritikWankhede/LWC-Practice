import { LightningElement ,api} from 'lwc';

export default class FetchRecordId extends LightningElement {

    @api recordId;
    @api objectApiName;
}