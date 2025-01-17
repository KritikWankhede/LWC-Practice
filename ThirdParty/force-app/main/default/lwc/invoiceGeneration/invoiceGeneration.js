import { LightningElement } from 'lwc';
import getInvoiceData from '@salesforce/apex/oppInvoice.getInvoiceData';
import PDFLIB from '@salesforce/resourceUrl/pdflib';
import { loadScript } from 'lightning/platformResourceLoader';
import { createRecord } from 'lightning/uiRecordApi';
import CONTENT_VERSION_OBJECT from '@salesforce/schema/ContentVersion';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InvoiceGeneration extends LightningElement {
    opportunityName;
    invoiceData;
    isrendered=false;
    showIframe=false;
    //pdfBytes;

    renderedCallback(){
        if(this.isrendered){
            return;
        }
        loadScript(this,PDFLIB).then(()=>{
            console.log('PDF-LIB Loaded');
            this.isrendered=true;
        }).catch((error)=>{
            console.log('Error while loading PDF-LIB',error);
        });
    }
    handleOppChange(event){
        this.opportunityName = event.target.value;
        console.log('Opportunity Name:', this.opportunityName);
        
    }

    searchProduct(){
        console.log('Inside Search Product');
        getInvoiceData({oppName:`${this.opportunityName}`}).then(data=>{
            console.log('Invoice Data:',data);
            this.invoiceData = data;
            this.createPdf(this.invoiceData);
        })
        .catch(error=>{
            console.log('Error:',error);
        });
    
    }

    async createPdf(data){
        console.log('Inside createPdf');
        const currentDate = new Date();
        console.log(currentDate.toLocaleDateString());
        const pdfDoc = await PDFLib.PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
        //const invoiceData=this.invoiceData;
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        const OppName=data[0].Opportunity.Name;
        console.log('Name',OppName);
        page.drawText(OppName, {
          x: 50,
          y: height - 50,
          size: fontSize + 8,
          font: timesRomanFont,
          color: PDFLib.rgb(0, 0.53, 0.71),
        });
        // page.drawText(`Customer:${data.customerName}`,{
        //     x:50,
        //     y:height-100,
        //     size:fontSize,
        //     font:timesRomanFont,
        //     color:PDFLib.rgb(0,0,0),
        // });
        page.drawText(`Date:${currentDate.toLocaleDateString()}`,{
            x:50,
            y:height-120,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        console.log('Print Item');
        page.drawText('Item',{
            x:50,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        console.log('Print Quantity');
        page.drawText('Quantity',{
            x:200,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        console.log('Print Price');
        page.drawText('Price',{
            x:300,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        console.log('Print Total');
        page.drawText('Total',{
            x:400,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        let yPosition =height-180;
        data.forEach(item=>{
            console.log('Print Item Name');
            // const sla = item.Name.substring(item.Name.indexOf("SLA:"));
            // console.log(sla);
            //console.log('Product Name:-',item.Name.substring(item.Opportunity.Name.length(),item.Name.length()));
            const productName = item.Name.replace(OppName, "").trim();
            console.log(productName);
            page.drawText(productName,{
                x:50,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0),
            });
            page.drawText(item.Quantity.toString(),{
                x:200,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0),
            });
            page.drawText(item.UnitPrice.toFixed(2),{
                x:300,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0),
            });
            page.drawText(item.TotalPrice.toFixed(2),{
                x:400,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0)
            });
            yPosition-=20;
        });
        page.drawText(`Total: ${data[0].Opportunity.Amount.toFixed(2)}`, {
            x: 400,
            y: yPosition - 20,
            size: fontSize,
            font: timesRomanFont,
            color: PDFLib.rgb(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        console.log('Generated PDF Bytes:', pdfBytes);
        //this.previewPdf(this.pdfBytes);
       // this.saveByteArray('Invoice.pdf', pdfBytes);
       this.uploadPDF(pdfBytes);
        //this.saveByteArray('My PDF',pdfBytes);
    }

    uploadPDF(pdfBytes) {
        const reader = new FileReader();
        console.log('Inside Uploading PDF');
        console.log('Opportunity Id:',this.invoiceData[0].Opportunity.Id);
        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            const fields = {
                Title: 'Invoice.pdf',
                PathOnClient: 'Invoice.pdf',
                VersionData: base64data,
                FirstPublishLocationId: this.invoiceData[0].Opportunity.Id
            };
            const recordInput = { apiName: CONTENT_VERSION_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'PDF uploaded successfully',
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error uploading PDF',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        };
        reader.readAsDataURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    }

    // The code is for saving the file directly without preview. 
    //One can use it to download the file directly
    // saveByteArray(pdfName, bytes) {
    //     console.log('Inside saveByteArray');
    //     var blob = new Blob([bytes], { type: "application/pdf" });
    //     var pdfURL = window.URL.createObjectURL(blob);
    //     console.log(pdfURL);
    //     var link = document.createElement('a');
    //     link.href = pdfURL;
    //     document.body.appendChild(link);
    //     link.download = pdfName;
    //     link.click();
    //     document.body.removeChild(link);
    // }
    
}