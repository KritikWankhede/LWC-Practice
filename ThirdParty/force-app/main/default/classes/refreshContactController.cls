public with sharing class refreshContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [Select Id, FirstName, LastName , Email From Contact Limit 10];
    }
}