import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/filterContact.getContactList';

export default class FilterAndSorting extends LightningElement {
    heading = ['Name', 'Title', 'Email'];
    fullDataTable = [];
    filterData = [];
    timer;
    filterBy = 'Name';

    @wire(getContactList)
    getRecords({ data, error }) {
        if (data) {
            console.log('Inside getRecords');
            console.log(data);
            this.fullDataTable = data;
            this.filterData = data;
        }
        if (error) {
            console.log(error);
        }
    }

    get filterByOptions() {
        return [
            { label: 'Name', value: 'Name' },
            { label: 'Title', value: 'Title' },
            { label: 'Email', value: 'Email' }
        ];
    }

    filterHandleChange(event) {
        this.filterBy = event.target.value;
    }

    changeHandler(event) {
        const { value } = event.target;
        console.log(value);
        window.clearTimeout(this.timer);
        if (value) {
            this.timer = window.setTimeout(() => {
                this.filterData = this.fullDataTable.filter((data) => {
                    const val = data[this.filterBy] ? data[this.filterBy] : '';
                    return val.toLowerCase().includes(value.toLowerCase());
                });
                console.log(this.filterData);
            }, 500);
        } else {
            this.filterData = [...this.fullDataTable];
        }
    }
}
