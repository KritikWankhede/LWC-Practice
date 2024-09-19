import { LightningElement, track } from 'lwc';
import res from '@salesforce/resourceUrl/bookImage';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";

export default class BookListApp extends LightningElement {
    timer;
    books;
    query = 'Human';
    @track imageUrl = '';
    @track base64Image = '';
    imageBook=res;
    connectedCallback() {
        this.fetchBooks();
    }

    fetchBooks() {
        fetch(BOOK_API + this.query)
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);
                this.books = jsonData ? this.formatData(jsonData) : [];
                console.log("this.books", this.books);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    changeHandler(event) {
        window.clearTimeout(this.timer);
        this.query = event.target.value;
        this.timer = setTimeout(() => {
            this.fetchBooks();
        }, 2000);
    }

    formatData(data) {
        console.log(data);
        let books = data.items.map(item => {
            let id = item.id;
            let thumbnail = item.volumeInfo.imageLinks && 
                (item.volumeInfo.imageLinks.smallThumbnail || item.volumeInfo.imageLinks.thumbnail);
            let title = item.volumeInfo.title;
            let publishedDate = item.volumeInfo.publishedDate;
            let maturityRating = item.volumeInfo.maturityRating || 'NA';

            // Convert image URL to Base64
            this.toDataURL(thumbnail, (dataUrl) => {
                this.base64Image = dataUrl;
            });

            return { id, thumbnail: this.base64Image, title, publishedDate, maturityRating };
        });
        return books;
    }

    toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
}
