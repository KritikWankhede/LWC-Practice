public with sharing class filterContact {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [Select Id, Name, Title, Email From Contact];
    }
}