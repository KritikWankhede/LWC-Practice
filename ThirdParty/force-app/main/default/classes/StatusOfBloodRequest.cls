public with sharing class StatusOfBloodRequest {
    @AuraEnabled(cacheable=true)
    public static List<Blood_Request__c> statusReport(String statusReq){
        try{
            return [Select Id,Name,Patient_Name__c,Blood_Quantity_Required__c,Blood_Group__c ,Status__c 
                from Blood_Request__c where Status__c	=:statusReq];
        }
        catch(Exception e){ 
            System.debug(e.getMessage());
            return null;
        }
    }
}