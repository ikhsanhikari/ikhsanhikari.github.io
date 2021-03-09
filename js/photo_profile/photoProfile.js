class PhotoProfile{
    constructor(){}
    async displayProfile(userId){
        const response = await fetch(baseURL+'profile_photos/userId/' + userId);
        return response;
    }
}