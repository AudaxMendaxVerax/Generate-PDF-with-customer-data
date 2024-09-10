public with sharing class AttestazionePatrimonialeCompController {
    @AuraEnabled
    public static list<string> isAccountAvailable(string keyId) {
        try {
            
            system.debug('keyId---'+keyId);
            list<Attestazione_Patrimoniale__c> attList=[select id,NDG_Attestazione__c from Attestazione_Patrimoniale__c where NDG_Attestazione__c=:keyId];
            
            if(attList.size()>0)
            {
                list<String> idListAttestzione =new list<string>();
                for(Attestazione_Patrimoniale__c obj:attList)
                {
                    idListAttestzione.add(obj.id); 
                }
                
                return idListAttestzione;
            }
            else
            {
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error while searching Attestazione Patrimoniale : ' + e.getMessage());
        }
    }
}
