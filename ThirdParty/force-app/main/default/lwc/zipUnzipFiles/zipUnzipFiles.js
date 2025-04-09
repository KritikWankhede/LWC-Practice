import { LightningElement ,track} from 'lwc';
import ZIP_FILES from '@salesforce/apex/ZipController.createZip';
import UNZIP_FILES from '@salesforce/apex/ZipController.unZipFiles';
export default class ZipUnzipFiles extends LightningElement {

    @track fileData;

    handleUploadFinished(event){
        this.fileData = event.detail.files[0];
        console.log('File Data after upload',this.fileData);
        console.log('File document Id:-',this.fileData.documentId);
        console.log('File Name after upload',this.fileData.name);
    }

    handleZip(){
        ZIP_FILES({contentDocumentIds: this.fileData})
         .then(result=>{
             console.log(result);

         }).catch(error=>{
             console.log(error);
         });
    }

    handleUnzip(){
        UNZIP_FILES({zipBlob:this.fileData.content})
         .then(result=>{
             console.log(result);
         }).catch(error=>{
             console.log(error);
         });
    }
}