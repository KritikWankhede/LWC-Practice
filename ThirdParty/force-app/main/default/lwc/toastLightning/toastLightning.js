import { LightningElement } from 'lwc';
// import {ShowToastEvent} from '@lightning/platformShowToastEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ToastLightning extends LightningElement {

    toastHandler(){
        console.log('inside toastHandler method.');
        console.log('toastHandler Event fired Success.');
       const eventToast= new ShowToastEvent({
                title:'Toast Event Success',
                message:'Task Executed Successfully',
                variant:'success',
                mode:'dismissable'
        });
        this.dispatchEvent(eventToast);
        console.log('End of Event');
    }

    toastHandlerError(){
        console.log('inside toastHandler method.');
        console.log('toastHandler Event fired Error.');
        const eventToast= new ShowToastEvent({
                    title:'Toast Event Error',
                    message:'Error Occurred while Processinfg Task',
                    variant:'error',
                    mode:'dismissable'
            });
            this.dispatchEvent(eventToast);
            console.log('End of Event');
    }
    toastHandlerInfo(){
        console.log('inside toastHandler method.');
        console.log('toastHandler Event fired Info.');
        const eventToast= new ShowToastEvent({
                    title:'Toast Event Info',
                    message:'Got the Info!',
                    variant:'Info',
                    mode:'dismissable'
            });
            this.dispatchEvent(eventToast);
            console.log('End of Event');
    }

    toastHandlerWarning(){
        console.log('inside toastHandler method.');
        console.log('toastHandler Event fired Warning.');
        const eventToast= new ShowToastEvent({
                    title:'Toast Event Warning',
                    message:'Warning Wake Up Now!',
                    variant:'Warning',
                    mode:'dismissable'
            });
            this.dispatchEvent(eventToast);
            console.log('End of Event');
    }
    

}