import { LightningElement } from 'lwc';
import LOCALE from '@salesforce/i18n/locale';
import CURRENCY from '@salesforce/i18n/currency';
import DIR from '@salesforce/i18n/dir';
export default class Internationalization extends LightningElement {
    dir=DIR;
    number=987.78;
    formattedNumber= new Intl.NumberFormat('hi-IN-u-nu-deva', {  
            style:'currency',
            useGrouping: false,
            currency:CURRENCY,
            currencyDisplay:'symbol'
        }).format(this.number);
}