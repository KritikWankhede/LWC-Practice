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

    @AuraEnabled
    public static List<Account> fetchAccount( String accName){
        try {
            return [Select Id,Name,AnnualRevenue,Industry,Type from Account 
                where Name =: accName Limit 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListCSV(){
        try {
            List<Account> accList=[Select Id,Name,AnnualRevenue,Industry,Type from Account];
            System.debug('Account List:-' +accList);
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}