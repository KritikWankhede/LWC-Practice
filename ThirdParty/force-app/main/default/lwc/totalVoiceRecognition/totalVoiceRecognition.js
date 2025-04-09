import { LightningElement, track } from 'lwc';
//import translate from 'google-translate-api';

export default class TotalVoiceRecognition extends LightningElement {

    @track transcript = '';
    @track isRecording= false;
    @track errorMessage='';
    @track translatedOption='en-US';
    recognition;
    @track translatedTranscript='';
    finalTranscript;
    @track selectedOption='';
    languages=[
    { label: 'English', value: 'en-US' },
    { label: 'Spanish', value: 'es-ES' },
    { label: 'French', value: 'fr-FR' },
     { label: 'German', value: 'de-DE' },
     { label: 'Italian', value: 'it-IT' },
     { label: 'Chinese', value: 'zh-CN' },
     { label: 'Dutch', value: 'nl-NL' },
     { label: 'Polish', value: 'pl-PL' },
     { label: 'Hindi', value: 'hi-IN' },
     { label: 'Telugu', value: 'te-IN' },
     { label: 'Marathi', value: 'mr-IN' }
    ];

    selectLanguage(event){
        console.log(event.target.value);
        this.selectedOption = event.target.value;
        this.recognition.lang = event.target.value;
    }
    translationOption(event){
        console.log(event.target.value);
        this.translatedOption = event.target.value;
        //this.recognition.lang = event.target.value;
    }
    connectedCallback(){
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(speechRecognition){
            this.recognition = new speechRecognition();
            this.recognition.continuous = true;
            this.recognition.lang = this.selectedOption;
            this.recognition.interimResults = true;
            this.recognition.onresult = (event) => {
                console.log('Voice recognition has started');
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {

                    if(event.results[i].isFinal){
                        this.finalTranscript += event.results[i][0].transcript;
                       
                    }
                    else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                this.transcript = this.finalTranscript + interimTranscript;
                this.recognition.onError = (event) => {
                    this.errorMessage = 'Error Occured:- '+event.error;
                    this.isRecording=false;
                };
            };
            
        }
        else{
            console.log('Speech Recognition is not supported by your browser');
            this.errorMessage = 'Speech Recognition is not supported.';
        }
        
    }
    startRecording(){
        if(this.recognition && !this.isRecording){
            this.transcript = '';
            this.finalTranscript = '';
            this.finalTranscript = '';
            this.recognition.start();
            this.isRecording = true;
        }
    }
    stopRecording(){
        if(this.recognition && this.isRecording){
            this.recognition.stop();
            this.isRecording = false;
        }
    }

    get isStartButtonDisabled(){
        console.log(this.isRecording && this.selectedOption !=='');
        console.log(this.isRecording || this.selectedOption ==='');
        return this.isRecording || this.selectedOption ==='';
    }

    get isStopButtonDisabled(){
        return !this.isRecording;
    }

    get hasErrorMessage(){
        return this.errorMessage !== '';
    }

    get showDefaultText(){
        return this.transcript === '' && this.errorMessage === '';
    }

    async translateTranscript() {
        const response = await fetch('http://localhost:3000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: this.transcript,
                targetLanguage: this.translatedOption
            })
        });
        const result = await response.json();
        console.log('Result:', result);
        this.translatedTranscript = result.translatedText;
    }

    get showTranslatedText(){
        return this.translatedTranscript !== '';
    }
    

}