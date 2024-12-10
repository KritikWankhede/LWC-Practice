global class SendEmail implements Schedulable 
{
    global void execute(SchedulableContext ctx)
    {
        List<Donor__c> donorList = [SELECT Id, Name, Donor_Name__c, Email_Id__c, Donation_Date__c FROM Donor__c
                                    WHERE Donation_Date__c = LAST_N_DAYS:90];
        EmailTask.reminder(donorList);
    }
}