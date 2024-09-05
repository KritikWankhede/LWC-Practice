import { LightningElement,track} from 'lwc';

export default class Basic extends LightningElement {
    nameChange='';
    ck=false;
    onchangeHandler(event){
        this.nameChange = event.target.value;
    }
    get handleGreeting(){
        return this.nameChange ? `Hello, ${this.nameChange}!` : 'Hello!';
    }
    // get greeting(){
    //     return `<lightning-card>
    //         <div onchange={onchangeHandler}>
    //             Hello {nameChange}
    //         </div>
    //     </lightning-card>`;
    // }

    @track address={
        street:'Sakhare Vasti',
        city:'Pimpri',
        state:'Maharashtra',
        country:'India'
    }
    onclickHandler(event){
        if(this.ck===false){
            this.ck=true;
        }
        else{
            this.ck=false;
        }
    }
    get handleAddress(){
        return this.address.street+' '+this.address.city+' '+this.address.state+' '+this.address.country;
    }


   
}