class User{
    constructor(){}

    async updatePhotoProfile(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    async updatePhotoCover(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    async getAllUser(){
        const response = await fetch(baseURL + 'users/search/')
        return response;
    }

    async searchUser(key){
        const response = await fetch(baseURL + 'users/search/'+key)
        return response;
    }
}