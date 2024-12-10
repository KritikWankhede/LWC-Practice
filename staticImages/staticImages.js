import { LightningElement } from 'lwc';
import USER_IMAGE  from '@salesforce/resourceUrl/userImage';
import USER_WALKING from '@salesforce/resourceUrl/userWalking';
export default class StaticImages extends LightningElement {
    userImage=USER_IMAGE;
    userWalking=USER_WALKING;

}