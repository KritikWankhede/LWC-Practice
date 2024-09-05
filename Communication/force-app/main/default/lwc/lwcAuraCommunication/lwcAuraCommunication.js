import { LightningElement ,api} from 'lwc';

export default class LwcAuraCommunication extends LightningElement {
    @api title;
    callAura(){
        const myEvent= new CustomEvent(
            'sendMsg',{
                detail:{
                'msg':'Hi there LWC from this Side.'
            }}
        );
        this.dispatchEvent(myEvent);
    }
}