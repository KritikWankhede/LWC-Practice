import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import TESSERACT_JS from '@salesforce/resourceUrl/tesseract';

export default class TranslateComponent extends LightningElement {
    @track detectedText = '';
    imageFile;
    tesseractInitialized = false;

    renderedCallback() {
        if (this.tesseractInitialized) {
            return;
        }
        this.tesseractInitialized = true;

        loadScript(this, TESSERACT_JS)
            .then(() => {
                console.log('Tesseract.js loaded successfully');
            })
            .catch(error => {
                console.error('Error loading Tesseract.js:', error);
            });
    }

    handleImageChange(event) {
        this.imageFile = event.target.files[0];
    }

    async handleDetectText() {
        if (this.imageFile) {
            try {
                const { Tesseract } = window;
                const fileReader = new FileReader();
                fileReader.onload = async () => {
                    const arrayBuffer = fileReader.result;
                    const blob = new Blob([arrayBuffer], { type: this.imageFile.type });
                    const { data: { text } } = await Tesseract.recognize(
                        blob,
                        'eng',
                        {
                            logger: m => console.log(m)
                        }
                    );
                    this.detectedText = text;
                };
                fileReader.readAsArrayBuffer(this.imageFile);
            } catch (error) {
                console.error('Error detecting text:', error);
            }
        } else {
            console.warn('No image file selected');
        }
    }
}
