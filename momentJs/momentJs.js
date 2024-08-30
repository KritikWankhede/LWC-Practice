import { LightningElement } from 'lwc';
import MOMENT from '@salesforce/resourceUrl/moment';
import {loadScript} from 'lightning/platformResourceLoader';

export default class MomentJs extends LightningElement {
    currentDate;
    renderedCallback(){
        Promise.all([
            loadScript(this, MOMENT + '/moment/moment.min.js')
        ]).then(()=>{
                this.setDateOnScreen();
        }).catch(error=>{
            console.error(error);
        })
    }

    setDateOnScreen(){
        this.currentDate=moment().format('LLLL');
    }
}