public with sharing class getContact {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactMethod(Id accId,String keyValue) {
        return [Select Id,LastName, AccountId, GenderIdentity from Contact 
            where AccountId=: accId AND GenderIdentity =:keyValue
        ];
    }

}