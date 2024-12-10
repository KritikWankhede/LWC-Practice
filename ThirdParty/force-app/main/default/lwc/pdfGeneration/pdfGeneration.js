import { LightningElement ,api} from 'lwc';
import pdfGenrationAttach from '@salesforce/apex/pdfController.pdfGenrationAttach';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class PdfGeneration extends LightningElement {
    @api recordId;
    invoiceData=
        {
                    invoiceNumber:"INV-0015",
                    invoiceDate:"1/10/2024",
                    invoiceDue:"10/10/2017",
                    companyName:"Sparx Suite",
                    address1:"1234 Maheswar Road",
                    address2:"Pune , Maharashtra"
        };
    clientData={
            client:'Acme Corp',
            userName:'John Doe',
            email:'jdoe@acmecorp.com'
    };
    services=[
        {
                name:'Service 1',
            	time:'2',
            	amount:'200'
        },
        {
            name:'Service 2',
            time:'3',
            amount:'300'
        },
        {
            name:'Service 3',
            time:'4',
            amount:'400'
        }
    ];

    get totalAmount(){
        return this.services.reduce((total,service)=>{
            return total+parseInt(service.amount);
        },0);
    }
    pdfHandler(){
        let content=this.template.querySelector('.container');
        console.log(content.outerHTML);
        pdfGenrationAttach({recordId:this.recordId,htmlText:content.outerHTML}).then((result)=>{
            console.log("Attachment Id"+result);
            const eve=new ShowToastEvent({
                title:'Success',
                message:'Pdf Generated Successfully',
                variant:'success'
            });
            this.dispatchEvent(eve);
            //alert('Pdf Generated Successfully');
            window.open(`https://kogs2-dev-ed.develop.file.force.com/servlet/servlet.FileDownload?file=${result.Id}`);
        }).catch(error=>{
            console.log(error);
            const eve=new ShowToastEvent({
                title:'error',
                message:this.error.message,
                variant:'error'
            });
            this.dispatchEvent(eve);
            alert('Error in generating pdf');
        });
    }

}