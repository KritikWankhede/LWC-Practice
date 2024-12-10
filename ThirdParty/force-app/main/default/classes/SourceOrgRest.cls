public class SourceOrgRest {

    @future(callout=true)
    public static void getDetails(){
        HttpRequest req=new HttpRequest();
        req.setEndpoint('callout:SalesforceKSource/services/apexrest/Account');
        req.setHeader('content-type','application/json;charset=UTF-8');
        req.setHeader('Accept','application/json');
        req.setMethod('GET');
        Http http=new Http();
        HttpResponse res=http.send(req);
        System.debug('response Code:'+res.getStatusCode());
        System.debug('response Body:'+res.getBody());

    }
    
    @future(callout=true)
    public static void sendDetails(){
        HttpRequest req=new HttpRequest();
        List<Account> accList=new List<Account>{
            new Account(Name='Test Rest 2'),
            new Account(Name='Test Rest 3')
        };
            
        Map<String,Object> requestBody=new Map<String,Object>();
        requestBody.put('accounts',accList);
        String jsonBody=JSON.serialize(requestBody);
        System.debug('Serialized JSON Body: ' + jsonBody);
        req.setEndpoint('callout:SalesforceKSource/services/apexrest/Account');
        req.setHeader('content-type','application/json;charset=UTF-8');
        req.setHeader('Accept','application/json');
        req.setBody(jsonBody);
        req.setMethod('POST');
        Http http=new Http();
        HttpResponse res=http.send(req);
        System.debug('response Code:'+res.getStatusCode());
        System.debug('response Body:'+res.getBody());
    }
}