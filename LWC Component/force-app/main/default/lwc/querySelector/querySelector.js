import { LightningElement } from 'lwc';

export default class QuerySelector extends LightningElement {
    userName=['Nick','John','Karl','Michael','Gab','Abby'];
    onclickHandler(){
        const userList=this.template.querySelectorAll('.user');
        Array.from(userList).forEach(element => {
            console.log(element.innerHTML);
        });;

        const elem=this.template.querySelector('p');
        console.log(elem.innerHTML);

        const childDy=this.template.querySelector('.child');
        childDy.innerHTML='<p>This is dynamic DOM element</p>';
    }
}