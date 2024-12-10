public with sharing class DonorController {
    @AuraEnabled(cacheable=true)
    public static Donor__c getDonorByAadhar(String aadharCard) {
        try{
        return [SELECT Id, Donation_Date__c, Blood_Bank_Campaign_Id__c, Age__c
                FROM Donor__c
                WHERE Aadhar_Card_Number__c	 = :aadharCard
                LIMIT 1];
        }
        catch(Exception e){
            System.debug('Inside the getDonorController exception');
            return null;
        }
    }
 
    @AuraEnabled
    public static void updateDonorDetails(String donorId, Date newDonationDate, String campaignName, Integer age) {
        try{
        List<Blood_Bank_Campaign__c> cmp=[Select Id from Blood_Bank_Campaign__c where Campaign_Name__c =:campaignName Limit 1];
        System.debug(cmp);
        List<Donor__c> donor = [SELECT Id,Donation_Date__c,Age__c,Status__c FROM Donor__c WHERE Id = :donorId LIMIT 1];
        System.debug(donor);
            for(Donor__c don:donor){
                don.Donation_Date__c = newDonationDate;
                don.Age__c = age;
                don.Status__c='Open';
                for(Blood_Bank_Campaign__c cmpId:cmp){
                    don.Blood_Bank_Campaign_Id__c = cmpId.Id;
                }
            }
        if(!donor.isEmpty()){ 
            System.debug(donor);
            update donor;
            
        }

        }
        catch(Exception e){
            System.debug('Inside the updateDonorDetails exception');

            System.debug(e.getMessage());
        }
    }
    
}