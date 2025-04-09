import { LightningElement } from 'lwc';
import flightSearchMethod from '@salesforce/apex/FlightSearch.flightSearchMethod';
export default class SearchFlightIntegration extends LightningElement {
    selectedValue = '';
    departureDate = '';
    fromcode = '';
    tocode = '';
    passengers = '';
    isLoading = false; 
    
    flightDetails={};
    error ={};

    currencyTypes = [
        { label: 'INR', value: 'INR' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' }
    ];

    handleCurrencyChange(event) {
        this.selectedValue = event.detail.value;
    }

    handleDepartureDateChange(event) {
        this.departureDate = event.target.value;
    }

    handleFromChange(event) {
        this.fromcode = event.target.value;
    }

    handleToChange(event) {
        this.tocode = event.target.value;
    }

    handlePassengersChange(event) {
        this.passengers = event.target.value;
    }

    handleSearch() {
        if (!this.fromcode || !this.tocode || !this.departureDate || !this.passengers || !this.selectedValue) {
            this.error = 'Please fill in all required fields.';
            this.flightDetails = null;
            return;
        }
        this.isLoading = true; 

        flightSearchMethod({
            fromCode: this.fromcode,
            toCode: this.tocode,
            whichDate: this.departureDate,
            adult: this.passengers,
            currencycoded: this.selectedValue
        })
        .then((result) => {
            console.log('Raw API Response:', result);

            try {
                this.isLoading = false;
                this.flightDetails = JSON.parse(result);
                this.error = null;
                console.log('Parsed Flight Data:', JSON.stringify(this.flightDetails, null, 2));
            } catch (error) {
                this.isLoading = false;
                this.flightDetails = null;
                this.error = 'Error parsing response from API';
                console.error('JSON Parsing Error:', error);
            }
        })
        .catch((error) => {
            this.isLoading = false;
            this.flightDetails = null;
            this.error = 'API request failed. Please try again.';
            console.error('API Error:', error);
        });
    }
}