import { LightningElement } from 'lwc';
import CURRENT_USERID from '@salesforce/user/Id';
import GUEST_USER from '@salesforce/user/isGuest';
export default class ImportInformation extends LightningElement {

    currentUserId=CURRENT_USERID;

    isGuestUser=GUEST_USER;

}