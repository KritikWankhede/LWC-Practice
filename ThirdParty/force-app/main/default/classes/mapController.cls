public with sharing class mapController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
       return [Select Id,Name,description,BillingStreet,BillingCountry,
       BillingPostalCode,BillingState,BillingCity
       from Account Where BillingStreet!=null
       ORDER BY Name Limit 10
       ];
    }
    
}