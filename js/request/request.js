class RequestPartner{
    constructor(){}

   async getRequest(idUser){
        const response = await fetch(baseURL+'partners/request/'+idUser)
        return response;
    }

    async  confirm(url = '', data = {},stompClient) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        stompClient.send('/app/notif/login', {}, JSON.stringify(
            {
                username: localStorage.getItem('username'),
                type: "confirm"
            },
        ))
        return response;
    }
}