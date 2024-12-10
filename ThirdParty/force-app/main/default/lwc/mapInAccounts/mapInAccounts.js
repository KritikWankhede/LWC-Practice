import { LightningElement ,wire} from 'lwc';
import getAccounts from '@salesforce/apex/mapController.getAccounts';
export default class MapInAccounts extends LightningElement {
    mapMarkers=[];
    markersTitle="Account Location";
    markerValue;
    @wire(getAccounts)
    mapHandler({data,error}){
        if(data){
            console.log(data);
            this.formatResponse(data);
        }
        if(error){
            console.log(error);
        }
    }
    formatResponse(data){
        this.mapMarkers=data.map(acc=>{
            return {
                location:{
                    City:acc.BillingCity || '',
                    Country:acc.BillingCountry || '',
                    PostalCode:acc.BillingPostalCode || '',
                    State:acc.BillingState || '',
                    Street:acc.BillingStreet || ''
                },
                title:acc.Name,
                description:acc.Description,
                value:acc.Name,
                icon:'utility:salesforce1'
            }
        });
        this.markerValue= this.mapMarkers.length && this.mapMarkers[0].value;
    }
    markerHandler(event){
        this.markerValue=event.detail.selectedMarkerValue;
    }
}