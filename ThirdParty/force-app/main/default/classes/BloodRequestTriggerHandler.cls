public class BloodRequestTriggerHandler {
    public static void handleAfterUpdate(List<Blood_Request__c> reqList,Map<Id,Blood_Request__c> oldMap)
    {
		Map<Id,Map<String,Decimal>> bankToRequest=new Map<Id,Map<String,Decimal>>();
        for(Blood_Request__c req: reqList){
            if(req.Status__c == 'Approved' && oldMap.get(req.Id).status__c=='Requested'){
                Id bankId=req.Blood_Bank_Id__c;
                String bloodGroup=req.Blood_Group__c;
                Decimal quantity = req.Blood_Quantity_Required__c;
                if(!bankToRequest.containsKey(bankId)){
                bankToRequest.put(bankId,new Map<String,Decimal>());
                }
                Map<String,Decimal> bloodGroupquan= bankToRequest.get(bankId);
                if(!bloodGroupquan.containsKey(bloodGroup)){
                    bloodGroupquan.put(bloodGroup,0);
                }
                bloodGroupquan.put(bloodGroup,bloodGroupquan.get(bloodGroup)+quantity);
            }
        }
                List<Blood_Inventory__c> bankList = [SELECT Id, A_positive_Quantity__c, A_Negative_Quantity__c,
                                             B_Quantity__c, B_negative_Quantity__c,
                                             AB_negative_Quantity__c, AB_positive_Quantity__c,
                                             O_positive_Quantity__c, O_negative_Quantity__c
                                             FROM Blood_Inventory__c WHERE Id IN :bankToRequest.keySet()];
                for(Blood_Inventory__c bank:bankList){
                    		Map<String,Decimal> bankQuantity =bankToRequest.get(bank.id);
                    for(String bloodGp:bankQuantity.keySet()){
                        	Decimal quan=bankQuantity.get(bloodGp);
                        switch on bloodGp{
                        				when 'A+' {
                                            bank.A_positive_Quantity__c -= quan;
                                        }
                                        when 'A-' {
                                            bank.A_Negative_Quantity__c -= quan;
                                        }
                                        when 'B+' {
                                            bank.B_Quantity__c -= quan;
                                        }
                                        when 'B-' {
                                            bank.B_negative_Quantity__c -= quan;
                                        }
                                        when 'AB+' {
                                            bank.AB_positive_Quantity__c -= quan;
                                        }
                                        when 'AB-' {
                                            bank.AB_negative_Quantity__c -= quan;
                                        }
                                        when 'O+' {
                                            bank.O_positive_Quantity__c -= quan;
                                        }
                                        when 'O-' {
                                            bank.O_negative_Quantity__c -= quan;
                                        }
                   }
                }
               }
        		if (!bankList.isEmpty()) {
           			 update bankList;
        		}
        }
    public static void hadlerBeforeInsert(List<Blood_Request__c> reqList){
        Set<String> reqEmailId=new Set<String>();
        for(Blood_Request__c req:reqList){
            reqEmailId.add(req.Email_Id__c);
            //req.Blood_Group__c
        }
        //Stores The Mail and its request Id 
        Map<String,Blood_Request__c> reqEmailmap=new Map<String,Blood_Request__c>();
        //List<Blood_Request__c> emailIdReq=[Select id,Blood_Group__c,Email_Id__c from Blood_Request__c
        //                                   where Email_Id__c in :reqEmailId];
        for(Blood_Request__c req: [Select id,Blood_Group__c,Email_Id__c from Blood_Request__c
                                           where Email_Id__c in :reqEmailId]){
            if(!reqEmailmap.containsKey(req.Email_Id__c)){
                reqEmailmap.put(req.Email_Id__c,req);
            }
        }
        for(Blood_Request__c req:reqList){
            //If the mail id is already present then the blood group is inserted as Previous one.
            if(reqEmailmap.containsKey(req.Email_Id__c)){
                req.Blood_Group__c=reqEmailmap.get(req.Email_Id__c).Blood_Group__c;
            }
        }
        
    }
}