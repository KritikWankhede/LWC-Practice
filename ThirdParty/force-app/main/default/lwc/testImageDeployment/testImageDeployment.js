import { LightningElement } from 'lwc';
// import RES from '@salesforce/resoureUrl/bookImage';
import bookImage from '@salesforce/resourceUrl/bookImage';
export default class TestImageDeployment extends LightningElement {
    imageBook=bookImage;
}