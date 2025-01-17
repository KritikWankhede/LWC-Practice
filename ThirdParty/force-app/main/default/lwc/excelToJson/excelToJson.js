import { LightningElement ,track} from 'lwc';
// I wan a create a component that will convert excel to json
import XLSX from '@salesforce/resourceUrl/xlsx';
import { loadScript } from 'lightning/platformResourceLoader';

export default class ExcelToJson extends LightningElement {

    @track jsonData;
    @track error;
    connectedCallback() {
        loadScript(this, XLSX + '/cdnjs/xlsx.full.min.js')
            .then(() => {
                console.log('XLSX library loaded.');
            })
            .catch(error => {
                console.error('Error loading XLSX library', error);
                this.error='Error loading XLSX library'+error;
            });
    }

    handleFileChange(event) {
        try {
            const file = event.target.files[0];
            console.log('File variable',file);
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = new Uint8Array(e.target.result);
                    console.log(data);
                    const workbook = XLSX.read(data, { type: 'array' });
                    console.log('Inside workbook',JSON.stringify(workbook));
                    const firstSheetName = workbook.SheetNames[0];
                    console.log('Inside firstSheetName',firstSheetName);
                    const worksheet = workbook.Sheets[firstSheetName];
                    console.log('Inside worksheet',worksheet);
                    this.jsonData = JSON.stringify(XLSX.utils.sheet_to_json(worksheet), null, 2);
                    console.log('Inside jsonData',this.jsonData);
                };
                reader.readAsArrayBuffer(file);
                //console.log(reader.readAsArrayBuffer(file));
            }
        } catch (error) {
            console.log('Inside error handleFileChange',error);
        }
       
    }
    get hasJsonData() {
        return this.jsonData && this.jsonData.length > 0;
    }

}