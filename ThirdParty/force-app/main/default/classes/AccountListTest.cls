@isTest
private class AccountListTest {

@isTest
    static void testGetFilterAccountList() {
        User u = createTestUser();
        List<Account> accountList = new List<Account>(); 
        accountList = AccountList.getFilterAccountList('Customer - Direct');
        Database.insert(accountList,false,AccessLevel.USER_MODE);
        Account acc = [Select Id,Name,AnnualRevenue,Type,Industry from Account Where Name = 'Test Account List'];
        System.runAs(u){
            Test.startTest();
            List<Account> accountListToCheck = AccountList.getFilterAccountList('Customer - Direct');
            Test.stopTest();
            System.assertEquals(acc.Id, accountListToCheck[0].Id, 'Account List size should be 1'); 
        }    
    }
@isTest
    static void testGetAccountListKey(){
        User u = createTestUser();
        List<Account> listAccount = new List<Account>();
        List<Account> listAccountSp = new List<Account>();
        Account acc = new Account(Name = 'Test Account List',AnnualRevenue = 1,Type = 'Customer - Direct',Industry = 'Agriculture');
        Account acc1 = new Account(Name = 'Test Account List1',AnnualRevenue = 2,Type = 'Customer - Channel',Industry = 'Apparel');
        Account acc2 = new Account(Name = 'Test Account List2',AnnualRevenue = 3,Type = 'Customer - Direct',Industry = 'Agency');
        listAccount.add(acc);
        listAccount.add(acc1);
        listAccount.add(acc2);
        Database.insert(listAccount,false,AccessLevel.USER_MODE);
        System.runAs(u){
            Test.startTest();
            listAccountSp = AccountList.getAccountListKey('Test Account List');
            Test.stopTest(); 
        }
        List<Account> accList = [Select Id,Name from Account Where Name LIKE: '%Test Account List%'];
        System.assertEquals(accList.size(), listAccountSp.size());
    }}