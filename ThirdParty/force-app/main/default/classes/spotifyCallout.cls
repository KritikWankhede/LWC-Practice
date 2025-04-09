public with sharing class spotifyCallout {
    
    @AuraEnabled
    public static string getSearchedSong(String trackname){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        String encodeName= EncodingUtil.urlEncode(trackname, 'UTF-8');
        //https://api.spotify.com/v1/search?q=Despacito&type=album&limit=1&offset=1
        request.setEndpoint('callout:Spotify/v1/search?q='+encodeName+'&type=track&limit=10&offset=15&include_external=audio');
        try{
            HttpResponse response = http.send(request);
            System.debug('Response code '+response.getStatusCode());
            System.debug('Response body '+response.getBody());
            System.debug('Response status '+response.getStatus());
            if(response.getStatusCode()==200){
                return response.getBody();
            }
            return null;
        }catch(System.CalloutException e){
            System.debug('Callout error: '+ e.getMessage());
            return e.getMessage();
        }catch(Exception e){
            System.debug('Exception error: '+ e.getMessage());
            return e.getMessage();
        }
    }

	@AuraEnabled(cacheable=true)
    public static String getLyrics(String trackname, String artist) {
        String endpoint = 'https://api.lyrics.ovh/v1/' + EncodingUtil.urlEncode(artist, 'UTF-8') + '/' + EncodingUtil.urlEncode(trackname, 'UTF-8');
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        //String encodeName= EncodingUtil.urlEncode(trackname, 'UTF-8');
        //https://api.spotify.com/v1/search?q=Despacito&type=album&limit=1&offset=1
        request.setEndpoint(endpoint);
        
        try{
            HttpResponse response = http.send(request);
            System.debug('Response code '+response.getStatusCode());
            System.debug('Response body '+response.getBody());
            System.debug('Response status '+response.getStatus());
            if(response.getStatusCode()==200){
                return response.getBody();
            }
            return null;
        }catch(System.CalloutException e){
            System.debug('Callout error: '+ e.getMessage());
            return e.getMessage();
        }catch(Exception e){
            System.debug('Exception error: '+ e.getMessage());
            return e.getMessage();
        }
    }
}