import { LightningElement,api } from 'lwc';

export default class SliderComponent extends LightningElement {
    val=30;
    onchangeHandler(event){
        this.val=event.target.value;
    }
    @api resetslider(){
        this.val=50;
    }
}