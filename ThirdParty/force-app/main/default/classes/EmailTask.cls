public class EmailTask {
    public static void reminder(List<Donor__c> donList)
    {
        // Create a new email
        List<Messaging.Email> emailList = new List<Messaging.Email>();
        for(Donor__c donor : donList)
        {
            // Create a new email
            Messaging.SingleEmailMessage emailMsg = new Messaging.SingleEmailMessage();
            // Set the email properties
            String[] toAddress = new String[]{donor.Email_Id__c};
                emailMsg.setToAddresses(toAddress);                                          
            String emailSub = donor.Donor_Name__c +',you are eligible to donate blood from TODAY!!!'; 
            emailMsg.setSubject(emailSub);                                           
            String disName = 'Blood Bank';
            emailMsg.setSenderDisplayName(disName);                                           
            String content = 'Greetings ' + donor.Donor_Name__c  + ',<br/><br/>' +
            'We are pleased to inform you that, from today you are eligible for donating blood.Its been 90 days since you donated blood last time.Kindly refer our website to know the ongoing and upcoming blood campaigns. <br/><br/>'+'Thanking You';
            emailMsg.setHtmlBody(content);
            emailList.add(emailMsg);                                
            
        }
        messaging.SendEmail(emailList);
    }
}