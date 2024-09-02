    import { LightningElement } from 'lwc';
    import MOMENT from '@salesforce/resourceUrl/moment';
    import {loadScript,loadStyle} from 'lightning/platformResourceLoader';
    import ANIMATE from '@salesforce/resourceUrl/animate';

    export default class MomentJs extends LightningElement {
    currentDate;
    isLoaded=false;


    renderedCallback(){
    if(this.isLoaded){
        return;
    }
    else{
        Promise.all([
            loadScript(this, MOMENT + '/moment/moment.min.js'),
            loadStyle(this,ANIMATE + '/animate/animate.min.css')
        ]).then(()=>{
                this.setDateOnScreen();
        }).catch(error=>{
            console.error(error);
        })
        this.isLoaded=true;
        }

    }

    setDateOnScreen(){
        this.currentDate=moment().format('LLLL');
    }
}