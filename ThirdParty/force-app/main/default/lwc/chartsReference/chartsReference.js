import { LightningElement ,wire} from 'lwc';
import getStageName from '@salesforce/apex/oppStage.getStageName'
export default class ChartsReference extends LightningElement {

    data;
    pieChartData=[];
    pieChartValue=[];

    // @wire(getStageName)
    // wiredData(result,error){
    //     if(result){
            
    //     }
    //     if(error){
    //         console.log(error);
    //     }
    // }

    connectedCallback(){
        getStageName().then(result => {
            this.data = result;
            console.log(this.data);
            // const stageName = Object.keys(this.data);
            // const stageCount = Object.values(this.data);
            // console.log(stageName+' '+stageName.length);
            // console.log(stageCount+' '+stageCount.length);
            // if(stageName.length){
            //     this.pieChartData = stageName;
            //     this.pieChartValue = stageCount;
            // }

            const datum=this.data.reduce((json,value)=>(
                {...json,[value.stageName]:(json[value.stageName]|0)+1}),{}
            );
            console.log(datum);
            if(Object.keys(datum).length){
                this.pieChartData = Object.keys(datum);
                this.pieChartValue = Object.values(datum);
            }
            console.log(this.pieChartData.length);
            console.log(this.pieChartValue.length);
            console.log(this.pieChartData);
            console.log(this.pieChartValue);
        }).catch(error=>{
            console.log(error);
        })
    }
    
}