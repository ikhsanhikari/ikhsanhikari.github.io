class Notification {

    constructor(userId) {
        this.userId = userId;
        // this.message = message;
    }

    async getNotification(userId) {
        const response = await fetch(baseURL + 'general_notifications/find/' + userId);
        return response;
    }
    async createNotification(url = '', data = {}, stompClient) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // stompClient.send('/app/notif/login', {}, JSON.stringify(
        //     {
        //         username: localStorage.getItem('username'),
        //         type: "create_notification"
        //     },
        // ))
        return response;
    }

    async readNotif(id) {
        const response = await fetch(baseURL + 'general_notifications/read/' + id)
        return response;
    }

    async readAllNotif(userId) {
        const response = await fetch(baseURL + 'general_notifications/readAll/' + userId)
        return response;
    }

    async getSignUpNotification() {
        const response = await fetch(baseURL + 'signup_notification');
        return response;
    }

    async  createSignUpNotification(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response;
    }
}