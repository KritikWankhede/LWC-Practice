public with sharing class ContactAccountLookupController {
    
        @AuraEnabled(cacheable=true)
        public static List<sObject> getAccountId(string searchKey) {
            List < sObject > returnList = new List < sObject > ();

            string sWildCardText = '%' + searchKey + '%';
            string sQuery = 'Select Id,Name From Account Where Name Like : sWildCardText order by createdDate DESC LIMIT 10';
            for (sObject obj: database.query(sQuery)) {
                returnList.add(obj);
            }
            return returnList;
        }

        @AuraEnabled(cacheable=true)
        public static List<Contact> getContactRecord(Id accId,String optLevel){
            return [Select Id,LastName,FirstName,AccountId,Account.Name,Level__c from Contact 
            where AccountId=:accId AND Level__c=: optLevel];
        }
}