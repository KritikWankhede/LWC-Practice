import { LightningElement } from 'lwc';

export default class SlotChildComponent extends LightningElement {
    footChange(){
        const foot=this.template.querySelector('.slds-card_footer');
        if(foot){
            foot.classList.remove('slds-hide');
        }
    }
}