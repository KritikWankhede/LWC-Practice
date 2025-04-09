import { LightningElement,wire,api,track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
export default class OppTeamMemebers extends LightningElement {

    @api objectApiName;
    @track recordTypeOptions = [];
    @track selectedRecordType;
    ck=false;
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    wiredObjectInfo({ error, data }) {
        if (data) {
            this.recordTypeOptions = Object.values(data.recordTypeInfos)
                .filter(recordType => !recordType.master) // Filter out the master record type
                .map(recordType => {
                    return { label: recordType.name, value: recordType.recordTypeId };
                });
        }else if (error) {
            console.error(error);
        }
        if(this.recordTypeOptions.length===0){
            this.ck=true;
        }
    }
    
    handleRecordTypeChange(event) {
        this.selectedRecordType = event.detail.value;
        console.log(this.selectedRecordType);
    }
}