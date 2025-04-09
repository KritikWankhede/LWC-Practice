public with sharing class TrainSearch {
   //b7a8880738msh8ba598bf91cfe97p15a3bdjsn54f7f710da69
   @AuraEnabled(cacheable=true)
   public static String getTrainSchedule(String trainNo) {
       String key=Label.train_API;
       HttpRequest req = new HttpRequest();
       req.setEndpoint('https://irctc1.p.rapidapi.com/api/v1/getTrainScheduleV2?trainNo=' + trainNo);
       req.setMethod('GET');
       req.setHeader('x-rapidapi-host', 'irctc1.p.rapidapi.com');
       req.setHeader('x-rapidapi-key', key); 

       Http http = new Http();
       HttpResponse res = http.send(req);

       if (res.getStatusCode() == 200) {
           return res.getBody();
       } else {
           throw new AuraHandledException('Error: ' + res.getStatusCode() + ' ' + res.getStatus());
       }
   }
}