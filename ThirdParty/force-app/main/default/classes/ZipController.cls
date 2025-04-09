public with sharing class ZipController {
    
    public static Blob createZip(List<Id> contentDocumentIds) {
        Compression.ZipWriter writer = new Compression.ZipWriter();
        for (Id contentDocumentId : contentDocumentIds) {
            ContentVersion cdv = [SELECT Id, VersionData FROM ContentVersion
                                WHERE Id = :contentDocumentId LIMIT 1];
            writer.addEntry('filename.ext',cdv.VersionData); // Replace 'filename.ext' with the desired filename
        }
        blob zipAttachment = writer.getArchive();
        
        return zipAttachment;
    }

    public static List<ContentVersion> unZipFiles(Blob zipBlob){
        //List<ContentVersion> cv=new List<ContentVersion>();
		Compression.ZipReader reader = new Compression.ZipReader(zipBlob);
        List<ContentVersion> extractedFiles = new List<ContentVersion>();
        List<Compression.ZipEntry> entries = reader.getEntries();
        for (Compression.ZipEntry entry : entries) {
   			Blob fileData = reader.extract(entry);
            ContentVersion cdv = new ContentVersion();
            cdv.Title = entry.getName();
            cdv.VersionData = fileData;
            extractedFiles.add(cdv);
        }
        
        return extractedFiles;        
        
    }
    
    
}