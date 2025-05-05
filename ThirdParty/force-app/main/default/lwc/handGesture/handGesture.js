import { LightningElement } from 'lwc';

export default class HandGesture extends LightningElement {
    startCamera=false;

    startHandler(){
        this.startCamera=true;
        console.log("Camera Started");
        this.initializeCamera();
    }

    
    initializeCamera() {
        const video = this.template.querySelector('video');
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
        video.srcObject = stream;
        })
        .catch(error => {
        console.error('Error accessing camera: ', error);
        });
    }

    
    handleGesture(gesture) {
        if (gesture === 'one_finger') {
            console.log('Gesture: One Finger');
        }
    }
}
