class WebSocketJs{

    constructor(stompClient){
        this.stompClient = stompClient;
        
    }
    
 connect() {
    var socket = new SockJS(baseURL + 'javatechie');
    this.stompClient = Stomp.over(socket);
    // console.log(this.stompClient)

    this.stompClient.connect({}, this.onConnected, function () {
        console.log('web connection cutted')
    });

    
}
onReceiveWeb(payload) {
    console.log(this.stompClient)
   var data = JSON.parse(payload.body);
   if (data.type == 'login') {
       console.log('login success ' + data.username)
   } else if (data.type == 'collabs') {
       listRequest()
   } else if (data.type == 'confirm') {
       allPartner(localStorage.getItem('uid'))
   } else if (data.type == 'post') {
       postObj.getAllPost(globalUID)
           .then((data) => data.json())
           .then((data) => {
               postUi.render(data);
           })

   } else if (data.type = 'chat') {
       selectChat(globalUID, partnerTamp)
       selectNotification()
   }
}

 onConnected() {
    console.log('ini'+this.stompClient)
    this.stompClient.subscribe('/topic/public', this.onReceiveWeb);

    this.stompClient.send('/app/notif/login', {}, JSON.stringify(
        {
            username: localStorage.getItem('username'),
            type: "login"
        },
    ))
}



}