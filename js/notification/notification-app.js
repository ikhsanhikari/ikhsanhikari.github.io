const uid = localStorage.getItem('uid')
const listNotification = document.querySelector('#list-notification');


listNotification.innerHTML = '';

// const notification = new Notification(uid,'hallo');
const notificationUi = new NotificationUi(listNotification);

notification.getNotification(uid).then((data)=>data.json()
.then((data)=>{
    data.data.forEach(element => {
        notificationUi.render(element)
    });
}))


function read(id){
   notification.readNotif(id)
}
document.querySelector('#readall').addEventListener('click',
    notification.readAllNotif(userId)
)