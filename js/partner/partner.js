class Partner{
    constructor(){}
 
    async displayPartner(userId){
        const response = await fetch(baseURL+'partners/' + userId);
        return response;
    }

    async requestPartner(userId){
        const response = await fetch(baseURL+'partners/request/'+userId);
        return response;
    }
}