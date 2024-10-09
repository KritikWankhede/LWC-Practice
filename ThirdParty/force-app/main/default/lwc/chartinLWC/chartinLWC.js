import { LightningElement,api } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs';
import {loadScript} from 'lightning/platformResourceLoader';
export default class ChartinLWC extends LightningElement {

    isInitialized=false;
    chart;
    @api chartHeading
    @api chartTitle
    @api chartLabel
    @api chartData 
    @api type
  
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
                this.isInitialized = false;
                console.log(error);
            });
        }
        
    }
    loadChart(){

        window.Chart.platform.disableCSSInjection=true;
        const canvas=document.createElement('canvas');
        this.template.querySelector('div.chart').appendChild(canvas);
        const ctx=canvas.getContext('2d');
        this.chart=new window.Chart(ctx,this.config());
    }

    config(){
        return {
                type:this.type,
                data: {
                    labels: this.chartLabel ? this.chartLabel :[],
                    datasets: [{
                      label: this.chartHeading,
                      data: this.chartData ? this.chartData:[],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgb(120, 146, 89, 0.2)',
                        'rgb(69, 129, 132, 0.2)',
                      ],
                      
                      borderWidth: 1
                    }]
                  },
                  
                  options: {
                      responsive:true,
                      legend:{
                        position:'right'
                      },
                      animation:{
                          animateScale:true,
                          animateRotate:true
                      }
                  }
            }
        }
}