public with sharing class oppStage {
   @AuraEnabled(cacheable=true)
   public static List<Opportunity> getStageName(){
    try {
        return [select Id,stageName from Opportunity ];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}