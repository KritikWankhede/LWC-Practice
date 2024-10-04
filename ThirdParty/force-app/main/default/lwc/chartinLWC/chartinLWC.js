import { LightningElement } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs';
import {loadScript} from 'lightning/platformResourceLoader';
export default class ChartinLWC extends LightningElement {

    isInitialized=false;

    renderedCallback(){

        if(this.isInitialized){
            return;
        }
        else{
            loadScript(this,chartJs+'/chartJs/Chart.js').then(()=>{
                console.log('ChartJs is loaded successfully');
                this.isInitialized=true;
                this.loadChart();
            }).catch((error)=>{
                console.log('Error while loading ChartJs');
                console.log(error);
            });
        }
        
    }
    loadChart(){
        const canvas=document.createElement('canvas');
        this.template.querySelector('div.chart').appendChild(canvas);
    }
}