import { LightningElement } from 'lwc';

export default class Modal extends LightningElement {
    onClose(){
        this.dispatchEvent(new CustomEvent('close'));
    }
    slotFooterChange(){
        const checkFooter=this.template.querySelector('.slds-modal__footer');
        if(checkFooter){
            checkFooter.classList.remove('slds-hide');
        }
    }
    slotHeaderChange(){
        const checkHeader=this.template.querySelector('.slds-modal__header');
        if(checkHeader){
            checkHeader.classList.remove('remove_header');
        }
    }
    
}