import { LightningElement } from 'lwc';

export default class ChildComponentA extends LightningElement {

    color='red';
    changeColor(){
        const event=new CustomEvent('colorchange',{
            detail:{value:this.color}
        });
        this.dispatchEvent(event);
    }
    handleColorChange(event){
        this.color = event.target.value;
    }
}