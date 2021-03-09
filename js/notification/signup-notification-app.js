const uid = localStorage.getItem('uid')
const listNotification = document.querySelector('#list-notification');


listNotification.innerHTML = '';

// const notification = new Notification(uid,'hallo');
const notificationUi = new NotificationUi(listNotification);

notification.getSignUpNotification().then((data)=>data.json()
.then((data)=>{
    data.data.forEach(element => {
        notificationUi.renderSignUpNotif(element)
    });
}))