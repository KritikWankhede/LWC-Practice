@isTest
public class TestBloodRequestApproved {
    @testSetup
    static void setup() {
        // Create common test data
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
        List<Blood_Request__c> reqList=new List<Blood_Request__c>();
        // Create a test Blood Request record
        Blood_Request__c testRequest1 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestOne',
            Email_Id__c='kritikTest1@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589321',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'A-',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest1);
        Blood_Request__c testRequest2 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestTwo',
            Email_Id__c='kritikTest2@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589322',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'A+',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest2);
        Blood_Request__c testRequest3 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestThree',
            Email_Id__c='kritikTest3@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589323',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'B+',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest3);
        Blood_Request__c testRequest4 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestFour',
            Email_Id__c='kritikTest4@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589324',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'B-',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest4);
        Blood_Request__c testRequest5 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestFive',
            Email_Id__c='kritikTest5@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589325',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'O+',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest5);
        Blood_Request__c testRequest6 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestSix',
            Email_Id__c='kritikTest6@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589326',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'O-',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest6);
        Blood_Request__c testRequest7 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestSeven',
            Email_Id__c='kritikTest7@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589327',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'AB+',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest7);
        Blood_Request__c testRequest8 = new Blood_Request__c(
            Patient_Name__c = 'Test RequestEight',
            Email_Id__c='kritikTest8@gmail.com',
            Hospital_Name__c='Top Hospital',
            Mobile_Number__c='8976589328',
            State__c='Maharashtra',
            Area__c='Nagpur',
            Status__c = 'Requested',
            Blood_Bank_Id__c = testBank.Id,
            Blood_Group__c = 'AB-',
            Blood_Quantity_Required__c = 3
        );
        reqList.add(testRequest8);
        insert reqList;
        //List<Blood_Request__c> upreqList=new List<Blood_Request__c>();
        for(Blood_Request__c req: reqList){
            req.Status__c='Approved';
        }
        
        update reqList;
        
    }
    
    @isTest
    public static void main(){
        // Verify the updated Blood Bank record
        Blood_Inventory__c updatedBank = [SELECT Id, A_positive_Quantity__c,Blood_Inventory_Name__c 
                                          FROM Blood_Inventory__c 
                                          WHERE Blood_Inventory_Name__c ='Test Blood Bank'];
        System.assertEquals(97, updatedBank.A_positive_Quantity__c, 'A+ quantity should be reduced by 97');
    }
    
    
}