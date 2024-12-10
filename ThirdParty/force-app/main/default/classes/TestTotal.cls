@isTest
public class TestTotal {
    public testmethod static void main(){
        Test.startTest();
       		Blood_Inventory__c testBank = new Blood_Inventory__c(
            Blood_Inventory_Name__c = 'Test Blood Bank',
           	State__c='Maharashtra',
           	Area__c='Nagpur',
           	Email_Id__c='test@gmail.com',
           Contact_Info__c='9878903456',
            A_positive_Quantity__c = 100,
            A_Negative_Quantity__c = 50,
            B_Quantity__c = 80,
            B_negative_Quantity__c = 30,
            AB_positive_Quantity__c = 60,
            AB_negative_Quantity__c = 20,
            O_positive_Quantity__c = 120,
            O_negative_Quantity__c = 70
        );
        insert testBank;
        Blood_Bank_Campaign__c testCamp=new Blood_Bank_Campaign__c(
        	Campaign_Name__c='Test to be done',
            Contact_Number__c='6789056780',
            Email_Id__c='testsub@gmail.com',
            Start_Date__c=Date.parse('29/05/2024'),
            End_Date__c=Date.parse('31/05/2024'),
            Venue__c='XYZ complex',
            Blood_Bank_Id__c=testBank.Id
        );
        insert testCamp;
        Donor__c testDon=new Donor__c(
        	Donor_Name__c = 'Test Subject',
            Aadhar_Card_Number__c='345678998710',
            Age__c=20,
            Contact_Number__c='9876432210',
            Donation_Date__c=Date.parse('29/05/2024'),
            Email_Id__c='testSubject@gmail.com',
            Gender__c='Male',
            Status__c='Open',
            Weight__c=65,
            Blood_Bank_Campaign_Id__c=testCamp.Id
        );
        insert testDon;
        	Blood_Bag__c testBag=new Blood_Bag__c(
                Donar_Id__c=testDon.Id,
                Blood_Group__c='A+',
                Blood_Quantity__c=3,
                Blood_Inventory__c=testBank.id
            );
        insert testBag;
        
        Test.StopTest();
        Donor__c don=[Select Id,Status__c from Donor__c where Id =: testDon.Id];
        System.assertEquals('Close',don.Status__c,'Status Should be changed To Close');
        Blood_Inventory__c updatedBank = [SELECT Id, A_positive_Quantity__c FROM Blood_Inventory__c WHERE Id = :testBank.Id];
        System.assertEquals(103, updatedBank.A_positive_Quantity__c, 'A+ quantity should be increase to 103');
    }
}