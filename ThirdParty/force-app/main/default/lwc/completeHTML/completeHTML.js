import { LightningElement, track } from 'lwc';
import ckEmail from '@salesforce/apex/toCheckEmail.ckEmail';
import insertContact from '@salesforce/apex/toCheckEmail.insertContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CompleteHTML extends LightningElement {
    @track contact = {
        FirstName: '',
        LastName: '',
        Email: ''
    };
    @track isDisabled = true;
    @track ck = false;

    handleKeyPress(event) {
        const field = event.target.dataset.id;
        this.contact[field] = event.target.value;

        if (this.contact.Email) {
            ckEmail({ EmailId: this.contact.Email })
                .then(data => {
                    this.ck = data;
                    if (!this.ck) {
                        this.toastEventHandler('Warning', 'Please enter a valid email', 'warning');
                    }
                    this.updateSubmitVisibility();
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.updateSubmitVisibility();
        }
    }

    isFormComplete() {
        console.log('inside isFormComplete');
        console.log(this.contact.FirstName && this.contact.LastName && this.contact.Email);
        return this.contact.FirstName && this.contact.LastName && this.contact.Email;
    }

    updateSubmitVisibility() {
        const isComplete = this.isFormComplete();
        console.log('Ck:- '+this.ck + ' isComplete:-'+isComplete);
        //const submitButton = this.template.querySelector('button');
        console.log(submitButton);
        if (isComplete && this.ck) {
            isDisabled = false;
           // submitButton.removeAttribute('disabled');
        }
        // } else {
        //     submitButton.setAttribute('disabled', '');
        // }
    }

    submitHandler() {
        insertContact({ con: this.contact })
            .then(data => {
                console.log(data);
                this.toastEventHandler('Success', 'Contact inserted', 'success');
            })
            .catch(error => {
                console.log(error);
                this.toastEventHandler('Error', 'Unable to save contact', 'error');
            });
    }

    toastEventHandler(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}
