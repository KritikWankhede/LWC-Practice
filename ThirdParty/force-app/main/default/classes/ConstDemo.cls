public class ConstDemo {
	public String bookId;
    public String bookName;
    public String author;
    public ConstDemo(String bookId,String bookName,String author){
        this.bookId=bookId;
        this.bookName=bookName;
        this.author=author;
    }
    public void display(){
        System.debug('Book details:-\n'+bookId+'\n'+bookName+'\n'+author);
    }
}