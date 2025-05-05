import { LightningElement,track } from 'lwc';

export default class ChildComponentB extends LightningElement {
     
     colorName;
     
      @track colorBarStyle = 'background-color: white; height: 50px; width: 100%;';

     handleChange(event){
        this.colorName=event.detail.value;
        this.colorBarStyle=`background-color: {this.colorName}; height: 50px; width: 100%;`;
        console.log('Color changed to: ' + this.colorName);
     }

}