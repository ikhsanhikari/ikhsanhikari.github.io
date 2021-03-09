class Cover{
    constructor(){}

    async displayCover(userId){
        const response = await fetch(baseURL+'cover_photos/userId/' + userId);
        return response;
    }
    
}