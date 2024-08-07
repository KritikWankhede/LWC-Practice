import { LightningElement} from 'lwc';

export default class ParentComponetPC extends LightningElement {
    
    percentageValue=10;
    onchangeHandler(event){
        this.percentageValue=event.target.value;
    }
    sliderReset(){
        this.template.querySelector('c-slider-component').resetslider();
    }
}