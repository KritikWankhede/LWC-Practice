public with sharing class pdfGen {
    public String pdfText{get;set;}
    public pdfGen() {
            pdfText=String.escapeSingleQuotes(
                ApexPages.currentPage().getParameters().get('pdfText')
            );
    }
}