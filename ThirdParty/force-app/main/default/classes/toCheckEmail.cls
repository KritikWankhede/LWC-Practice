public with sharing class toCheckEmail {
    @AuraEnabled(cacheable=true)
    public static Boolean ckEmail(String EmailId){
        if(String.isBlank(EmailId)){
            return false;
        }
        else{
            List<Contact> conList=[Select Id,LastName,Email from Contact 
            WHERE Email=:EmailId];
            return conList.isEmpty();
        }
        
    }

    @AuraEnabled
    public static void insertContact(Contact con){
        try {
            if(con != null){
                insert con;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}