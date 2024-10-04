import { LightningElement, track, wire } from 'lwc';
import getContactRecords from '@salesforce/apex/contactDetails.getContactRecords';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Account Name', fieldName: 'AccountName' }
];

export default class Pagination extends LightningElement {
    pageSize = 10;
    @track record = [];
    @track columns = columns;
    @track totalRecords = 0; // Total number of records
    @track totalPages = 0; // Total number of pages
    @track pageNumber = 1; // Page number    
    @track recordsToDisplay = []; // Records to be displayed on the page

    @wire(getContactRecords)
    handleRecords({ data, error }) {
        if (data) {
            console.log(data);
            this.record = data.map(result => {
                return {
                    ...result,
                    AccountName: result.Account ? result.Account.Name : ''
                };
            });
            this.totalRecords = this.record.length;
            this.paginationHelper();
        }
        if (error) {
            console.log(error);
        }
    }

    previousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1;
            this.paginationHelper();
        }
    }

    nextPage() {
        if (this.pageNumber < this.totalPages) {
            this.pageNumber = this.pageNumber + 1;
            this.paginationHelper();
        }
    }

    get disablePrevious() {
        return this.pageNumber === 1;
    }

    get disableLast() {
        return this.pageNumber === this.totalPages;
    }

    paginationHelper() {
        this.recordsToDisplay = [];
        // Calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // Set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // Set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay = [...this.recordsToDisplay, this.record[i]];
        }
    }
}
