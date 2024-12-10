public with sharing class pdfController {
    @AuraEnabled()
    public static Attachment pdfGenrationAttach(Id recordId,String htmlText){
        PageReference page= Page.renderAsPdf;
        page.getParameters().put('pdfText',htmlText);
        List<Attachment> attachmentList=new List<Attachment>();
        Contact con=new Contact(Id=recordId);
        Attachment objAttach=new Attachment();
        objAttach.Name='Invoice.pdf';
        objAttach.ParentId=con.Id;
        objAttach.Body=page.getContentaspdf();
        objAttach.IsPrivate=false;
        attachmentList.add(objAttach);
        insert attachmentList;
        return objAttach;
    }
    
}