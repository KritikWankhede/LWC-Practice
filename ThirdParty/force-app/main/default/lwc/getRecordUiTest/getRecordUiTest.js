import { LightningElement,wire } from 'lwc';
import { getRecordUi} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class GetRecordUiTest extends LightningElement {

    recordId='001dM00000LliPiQAJ';
    dataInfo;
    objectApiName='Account';
    error;
    /*handleChange(event){
        const recordId=event.target.value;
    
        if((recordId.length===18 || recordId.length===15) && event.target.label==='Enter the record ID'){
            this.recordId=recordId;
            console.log('Record ID: '+this.recordId);
        }
        if(event.target.label==='Enter the object API Name'){
            this.objectApiName=event.target.value;
            console.log('Object API Name: '+this.objectApiName);
        }
    }*/
    
    
    @wire(getRecordUi,{ recordIds:'$this.recordId',LayoutTypes:'Full', modes:'View'})
    recordUi({error,data}){
        if(data){
            console.log('Inside getRecordUi');
            console.log('Record UI data: ',data);
            this.dataInfo=data;
            this.showToast('Success', 'Record UI data retrieved successfully', 'success');
        }else if(error)
            console.error('Error retrieving record UI data: ',error);
            this.error = error.body.message || 'Unknown error';
            this.showToast('Error', 'Error retrieving record UI data', 'error');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

    
    get processedFields() {
        if (
            this.dataInfo &&
            this.dataInfo.layouts &&
            this.dataInfo.layouts[this.objectApiName] &&
            this.dataInfo.fields
        ) {
            const layoutFields =
                this.dataInfo.layouts[this.objectApiName].Full.View;
            return layoutFields.map((field) => ({
                apiName: field.apiName,
                label: field.label,
                value: this.dataInfo.fields[field.apiName]?.value || ''
            }));
            console.log('layoutFields Fields: ', layoutFields);
        }
        return [];
    }



}