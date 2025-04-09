public with sharing class FlightSearch {
    @AuraEnabled
    public static String flightSearchMethod(String fromCode, String toCode, String whichDate, Integer adult, String currencycoded) {
        String key= Label.train_API;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        
        String formattedDate = whichDate.replace('-', '');
        
        // Set the endpoint URL
        req.setEndpoint('https://aerodatabox.p.rapidapi.com/flights/number/DL47/' + formattedDate + '?withAircraftImage=false&withLocation=false&dateLocalRole=Both');
       // req.setEndpoint('https://aerodatabox.p.rapidapi.com/flights/airports/'+whichDate+'?withAircraftImage=false&withLocation=false&dateLocalRole=Both');
        req.setMethod('GET');

        // Set the headers
        req.setHeader('x-rapidapi-host', 'aerodatabox.p.rapidapi.com');
        req.setHeader('x-rapidapi-key', key);
        
        try {
            HttpResponse res = http.send(req);
            if (res.getStatusCode() == 200) {
                System.debug('Response== ' + res.getBody());
                return res.getBody();
            } else {
                System.debug('Error Response Code: ' + res.getStatusCode() + ' Message: ' + res.getStatus());
                return '{"error": "Request failed", "statusCode": ' + res.getStatusCode() + ', "message": "' + res.getStatus() + '"}';
            }
        } catch (Exception e) {
            System.debug('Exception Occurred: ' + e.getMessage());
            return '{"error": "Exception occurred", "message": "' + e.getMessage() + '"}';
        }
    }
}