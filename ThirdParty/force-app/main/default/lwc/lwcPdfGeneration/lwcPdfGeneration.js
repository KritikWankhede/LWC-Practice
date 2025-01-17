import { LightningElement } from 'lwc';
import PDFLIB from '@salesforce/resourceUrl/pdflib';
import { loadScript } from 'lightning/platformResourceLoader';

//createInvoicePdf(invoiceData);
export default class LwcPdfGeneration extends LightningElement {

    //PDFLIB = PDFLIB;
    // isrendered = false;
    pdfLibLoaded = false;
    
    
    renderedCallback() {
        if(this.pdfLibLoaded) {
            return;
        }
        loadScript(this, PDFLIB).then(() => {
            console.log('PDF-LIB Loaded');
            this.pdfLibLoaded = true;
        }).catch((error) => {
            console.log('Error while loading PDF-LIB', error);
        });
        
    }

    async createPdf() {
        // if (!this.pdfLibLoaded) {
        //     console.error('PDF-LIB is not loaded yet.');
        //     return;
        // }
        console.log('Inside createPdf');
        const invoiceData = {
            companyName: 'Korg',
            customerName: 'John Doe',
            date: '2025-10-01',
            items: [
                { name: 'Product 1', quantity: 2, price: 10.00 },
                { name: 'Product 2', quantity: 1, price: 20.00 },
            ],
            total: 40.00,
        }; 
        const pdfDoc = await PDFLib.PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
        //const invoiceData=this.invoiceData;
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        page.drawText(invoiceData.companyName, {
          x: 50,
          y: height - 50,
          size: fontSize + 8,
          font: timesRomanFont,
          color: PDFLib.rgb(0, 0.53, 0.71),
        });
        page.drawText(`Customer:${invoiceData.customerName}`,{
            x:50,
            y:height-100,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        page.drawText(`Date:${invoiceData.date}`,{
            x:50,
            y:height-120,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        page.drawText('Item',{
            x:50,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        page.drawText('Quantity',{
            x:200,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        page.drawText('Price',{
            x:300,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });
        page.drawText('Total',{
            x:400,
            y:height-160,
            size:fontSize,
            font:timesRomanFont,
            color:PDFLib.rgb(0,0,0),
        });

        let yPosition =height-180;
        invoiceData.items.forEach(item=>{
            page.drawText(item.name,{
                x:50,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0),
            });
            page.drawText(item.quantity.toString(),{
                x:200,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0),
            });
            page.drawText(item.price.toFixed(2),{
                x:300,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0),
            });
            page.drawText((item.price*item.quantity).toFixed(2),{
                x:400,
                y:yPosition,
                size:fontSize,
                font:timesRomanFont,
                color:PDFLib.rgb(0,0,0)
            });
            yPosition-=20;
        });
        page.drawText(`Total: ${invoiceData.total.toFixed(2)}`, {
            x: 400,
            y: yPosition - 20,
            size: fontSize,
            font: timesRomanFont,
            color: PDFLib.rgb(0, 0, 0),
        });
    
        const pdfBytes = await pdfDoc.save();
        console.log(pdfBytes);
        this.saveByteArray('My PDF',pdfBytes);
      }
      saveByteArray(pdfName,bytes){
          console.log('Inside saveByteArray');
          var blob = new Blob([bytes], {type: "application/pdf"});
          var pdfURL = window.URL.createObjectURL(blob);
          console.log(pdfURL);
          var link = document.createElement('a');
          link.href = pdfURL;
          document.body.appendChild(link);
          link.download = pdfName;
          link.click();
          //document.body.removeChild(link);
      }
      
}