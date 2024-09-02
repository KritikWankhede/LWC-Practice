import { LightningElement } from 'lwc';
export default class ChildModalComponent extends LightningElement {
    content='Successfully Completed';
    handleOkay() {
        const myEvent= new CustomEvent('close',{
            detail:'Successfully Done.'
        });
        this.dispatchEvent(myEvent);
        this.close('okay');
    }
}