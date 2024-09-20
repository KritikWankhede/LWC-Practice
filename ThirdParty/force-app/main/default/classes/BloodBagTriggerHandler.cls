public class BloodBagTriggerHandler {
    public static void handleBeforeInsert(List<Blood_Bag__c> newBloodBags) {
        
        // Collect the donor IDs from the new blood bags
        Set<Id> donorIds = new Set<Id>();
        for (Blood_Bag__c bloodBag : newBloodBags) {
            if ( bloodBag.Donar_Id__c!= null) {
                donorIds.add(bloodBag.Donar_Id__c);
            }
        }

        if (!donorIds.isEmpty()) {
            // Query the existing blood bags for the donors
            Map<Id, Blood_Bag__c> donorToBloodBagMap = new Map<Id, Blood_Bag__c>();
            for (Blood_Bag__c existingBloodBag : [
                SELECT Donar_Id__c, Blood_Group__c 
                FROM Blood_Bag__c 
                WHERE Donar_Id__c IN :donorIds 
                ORDER BY CreatedDate DESC
            ]) {
                // Only store the latest blood bag per donor
                if (!donorToBloodBagMap.containsKey(existingBloodBag.Donar_Id__c)) {
                    donorToBloodBagMap.put(existingBloodBag.Donar_Id__c, existingBloodBag);
                }
            }

            // Ensure new blood bags have the same blood group as the previous blood bag for the donor
            for (Blood_Bag__c bloodBag : newBloodBags) {
                if (bloodBag.Donar_Id__c != null && donorToBloodBagMap.containsKey(bloodBag.Donar_Id__c)) {
                    Blood_Bag__c latestBloodBag = donorToBloodBagMap.get(bloodBag.Donar_Id__c);
                    bloodBag.Blood_Group__c = latestBloodBag.Blood_Group__c;
                }
            }
        }
    }
    public static void handleAfterInsert(List<Blood_Bag__c> bagList){
		Set<Id> donorId=new Set<Id>();
        Map<Id,Map<String,Decimal>> bankToBloodGroup=new Map<Id,Map<String,Decimal>>();
        for(Blood_Bag__c bag:bagList){
            Id bankId=bag.Blood_Inventory__c;
            Id donId=bag.Donar_Id__c;
            String bloodGroup=bag.Blood_Group__c;
            Decimal quantity=bag.Blood_Quantity__c;
            donorId.add(donId);
            if(!bankToBloodGroup.containsKey(bankId)){
						bankToBloodGroup.put(bankId,new Map<String,Decimal>());		                
            }
            Map<String,decimal> bloodGroupQuantity= bankToBloodGroup.get(bankId);
            //bloodGroupQuantity.put(bloodGroup,quantity);
            if(!bloodGroupQuantity.containsKey(bloodGroup)){
                bloodGroupQuantity.put(bloodGroup,0);
            }
            bloodGroupQuantity.put(bloodGroup,bloodGroupQuantity.get(bloodGroup)+quantity);
            System.debug(bankId);
            System.debug(donId);
        }
            List<Donor__c> donList=[Select Id,status__c from Donor__c where Id IN :donorId];
            for(Donor__c don:donList){
                don.status__c='Close';   
                System.debug('Status:-'+don.status__c);
            }
        update donList;
            
            //bag.Donar_Id__c.Status__c='Close';
            List<Blood_Inventory__c> bankList=[select Id,A_positive_Quantity__c,A_Negative_Quantity__c,
                                               	B_Quantity__c,B_negative_Quantity__c,
                                               	AB_negative_Quantity__c,AB_positive_Quantity__c,
                                               	O_positive_Quantity__c,O_negative_Quantity__c
                                               	from Blood_Inventory__c where Id=:bankToBloodGroup.keySet() ];
            for(Blood_Inventory__c bank:bankList){
                Map<String,Decimal> bloodGroupQuantity=bankToBloodGroup.get(bank.Id);
                System.debug(bank.Id);
               // System.debug('Before Adding:-'+bank.A_positive_Quantity__c);
                for(String bloodGp:bloodGroupQuantity.keySet()){
                    Decimal bloodQuantity=bloodGroupQuantity.get(bloodGp);
                    switch on bloodGp{
                        when 'A+'{
                        	bank.A_positive_Quantity__c+=bloodQuantity;
                        }
                        when 'A-'{
                            bank.A_Negative_Quantity__c+=bloodQuantity;
                        }
                        when 'B+'{
                            bank.B_Quantity__c+=bloodQuantity;
                        }
                        when 'B-'{
                            bank.B_negative_Quantity__c+=bloodQuantity;
                        }
                        when 'AB+' {
                        bank.AB_positive_Quantity__c += bloodQuantity;
                    	}
                    	when 'AB-' {
                        bank.AB_negative_Quantity__c += bloodQuantity;
                    	}
                    	when 'O+' {
                        bank.O_positive_Quantity__c += bloodQuantity;
                    	}
                    	when 'O-' {
                        bank.O_negative_Quantity__c += bloodQuantity;
                    	}
                    }
                }  
            }
        update bankList;         
    }
    public static void handleBeforeDelete(List<Blood_Bag__c> bagList){
        for(Blood_Bag__c bag : bagList){
            if(bag.Blood_Expiry_Date__c>=System.today()){
                bag.addError('The blood is yet to expire. You Cannot delete it');
            }
        }
    }
}