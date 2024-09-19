public with sharing class AccountList {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [Select Id,Name,AnnualRevenue,Type,Industry from Account 
                Where Type != Null AND Industry != Null];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getFilterAccountList(String filterType) {
        return [Select Id,Name,AnnualRevenue,Type,Industry from Account 
                Where Type=: filterType];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListKey(String key){
        return [Select Id,Name from Account 
                Where Name LIKE: '%'+key+'%'];
    }
}