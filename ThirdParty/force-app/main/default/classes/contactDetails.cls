public with sharing class contactDetails {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactRecords(){
        try{
            return [Select Id,FirstName,LastName,Account.Name,Email from Contact];
        }
        catch(Exception e){
            System.debug('Inside the getContactRecords exception');
            return null;
        }
    }
}