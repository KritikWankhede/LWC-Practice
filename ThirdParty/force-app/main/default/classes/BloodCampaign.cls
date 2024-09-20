public with sharing class BloodCampaign {
	@AuraEnabled(cacheable=true)
    public static List<Blood_Bank_Campaign__c> getBloodCampaignDetails(){
        return [Select Name,Campaign_Name__c,Email_Id__c,Start_Date__c,End_Date__c,
                Contact_Number__c,Venue__c from Blood_Bank_Campaign__c
               where End_Date__c>=today];
    }  
}