class Comment{
    constructor(){}

    async  comment(url = '', data = {},stompClient) {
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
                type: "post"
            },
        ))
        return response;
    }    
}