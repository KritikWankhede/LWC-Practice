public class BloodDonationController {
			@AuraEnabled(cacheable=true)
    public static Donor__c getDonorData(String aadharNumber) {
        List<Donor__c> donors = [SELECT Id, Name, Donation_Date__c,Email_Id__c FROM Donor__c WHERE Aadhar_Card_Number__c =:aadharNumber LIMIT 1];
        if (!donors.isEmpty()) {
            return donors[0];
        } else {
            return null;
        }
    }
    
    @AuraEnabled
    public static Boolean canDonate(String aadharNumber) {
        if(aadharNumber.length() != 12 ){
            return false;
        }
        Donor__c donor = getDonorData(aadharNumber);
        if (donor == null) {
            return true; // If no record found, assume donor can donate
        }
        Date lastDonationDate = donor.Donation_Date__c;
		Date currentDate = Date.today();
        return lastDonationDate == null || currentDate.daysBetween(lastDonationDate) > 90;
    }
}