import { LightningElement,api } from 'lwc';

export default class MetaConfig extends LightningElement {

    @api recordId;
    @api heading;
    @api Ageing;
    @api Escalation;

}