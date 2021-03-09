

var stompClient = null;
connect()

requestObj.getRequest(localStorage.getItem('uid'))
    .then((data) => data.json())
    .then((data) => {
        document.querySelector('#list-request').innerHTML = '';
        data.data.forEach((item) => {
            var html = `<div class="list-group list-group-flush">
                            <div class="list-group-item">
                                <div class="row">
                                    <div class="col-md-7">
                                    ${item.firstName} ${item.lastName}
                                    </div>
                                    <div class="col-md-4">
                                    <button class="btn fas fa-plus btnBgGeneral" onclick="confirmAction(` + item.id + `,this)"> confirm</button>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>`
            document.querySelector('#list-request').innerHTML += html;
        })

    })

const request = new  RequestPartner()
function confirmAction(partnerId,me) {

    var payload = {
        userId: userId,
        partnerId: partnerId
    }
    request.confirm(baseURL + 'partners/confirm', payload,stompClient)
    .then(()=>{
        console.log('confirmed')
    })
    .catch((error)=>{
        console.log(error)
    });

    me.disabled = true;
    me.innerHTML = 'You\'re Partner'
}


// //websocket 
function connect() {
    var socket = new SockJS(baseURL + 'javatechie');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, function () {
        console.log('web connection cutted')
    });
}

function onConnected() {
    stompClient.subscribe('/topic/public', onReceiveWeb);

    stompClient.send('/app/notif/login', {}, JSON.stringify(
        {
            username: localStorage.getItem('username'),
            type: "login"
        },
    ))
}


function onReceiveWeb(payload) {
    var data = JSON.parse(payload.body);
    if (data.type == 'login') {
        console.log('login success ' + data.username)
    } else if (data.type == 'collabs') {
        listRequest()
    } else if (data.type == 'confirm') {
        // allPartner(localStorage.getItem('uid'))
        selectNotification();
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


function selectNotification(){
    notification.getNotification(userId).then((data) => data.json()
    .then((data) => {
        var html = ''

        var item = 0 ;
        

        data.data.forEach(data => {
            if(data.isRead == 0){
                item++;
            }
            html += `<div class="list-group list-group-flush">
                    <div class="list-group-item">
                        ${data.message}
                    </div>
                </div>`
        });
        html += '<a href="' + baseURLWEB + 'notification.php">View all</a>'
        if( item == 0 ){
            document.querySelector('#notifAmount').style.visibility = 'hidden'
        }else{
            document.querySelector('#notifAmount').innerHTML = item
        }
        
        document.querySelector('#notificationIcon').setAttribute('data-content', html)
    }))
}