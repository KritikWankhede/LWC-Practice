import { LightningElement,track} from 'lwc';
import getContactRecords from '@salesforce/apex/contactDetails.getContactRecords';
const columns=[
    {label:'First Name',fieldName:'FirstName'},
    {label:'Last Name',fieldName:'LastName'},
    {label:'Email',fieldName:'Email'},
    {label:'Account Name',fieldName:'AccountName'},
]
export default class DragAndSave extends LightningElement {

    @track columns = columns;
    @track data;
    dragStart;

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        getContactRecords().then(result => {
            console.log(result);
            this.data = result.map((record, index) => {
                return { ...record, index: index.toString(),
                        AccountName: record.Account ? record.Account.Name :''
                 };
            });
            console.log(this.data);
        }).catch(error => {
            console.error(error);
        });
    }

    DragStart(event) {
        this.dragStart = event.target.title;
        event.target.classList.add("drag");
      }
    
      DragOver(event) {
        event.preventDefault();
        return false;
      }
    
      Drop(event) {
        event.stopPropagation();
        const DragValName = this.dragStart;
        const DropValName = event.target.title;
        if (DragValName === DropValName) {
          return false;
        }
        const index = DropValName;
        const currentIndex = DragValName;
        const newIndex = DropValName;
        Array.prototype.move = function (from, to) {
          this.splice(to, 0, this.splice(from, 1)[0]);
        };
        this.ElementList.move(currentIndex, newIndex);
      }
}