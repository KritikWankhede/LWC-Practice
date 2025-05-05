import { LightningElement } from 'lwc';
import getLiveStatus from '@salesforce/apex/TrainSearch.getLiveStatus';
export default class TrainLiveStatus extends LightningElement {

    trainNo;
    result;
    handleKeyChange(event) {
        this.trainNo = event.target.value;
    }

    handleSubmit(){
        getLiveStatus({trainNo: this.trainNo})
            .then(result => {
                this.result = JSON.parse(result);
                console.log('Result-->',this.result);
            })
            .catch(error => {
                this.error = error;
            });
    }


}