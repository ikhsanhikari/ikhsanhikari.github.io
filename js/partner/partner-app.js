const uid = localStorage.getItem('uid')
const listPartner = document.querySelector('#list-partner');


listPartner.innerHTML = '';

const partner = new Partner();
const partnerUi = new PartnerUi(listPartner);

const profile = new PhotoProfile();
var stompClient = null;
var partnerTamp ;

connect()


partner.displayPartner(uid).then((data)=>data.json()
.then((data)=>{
    data.data.forEach(element => {
        profile.displayProfile(element.id)
        .then((data)=>data.json())
        .then((data)=>{
            partnerUi.render(element,data.data)
        })
        
    });
}))

const chatObj = new Chat();

async function selectChat(from, to) {
    var chatBar = document.querySelector('#chat');
    const response = await fetch(baseURL + 'chats/specific?from=' + from + '&to=' + to + '')
        .then((data) => data.json())
        .then((data) => {
            chatBar.innerHTML = ''
            data.data.forEach((item) => {
                if (item.userId == userId) {
                    chatBar.innerHTML +=
                        `<div class="speech-bubble" style=" margin-top:5%;clear: both; padding:2%"> 
                <pre class="text-description" >`+ item.message + `</pre></div>`
                } else {
                    chatBar.innerHTML +=
                        `<div class="speech-bubble2" style="margin-top:5%; clear: both; padding:2%; text-align:right;"> 
                <pre class="text-description " >`+ item.message + `</pre></div>`
                }

            })
        })
}


function chatRoom(event, name, photoProfile) {
    document.querySelector('#chat-title').innerHTML = name
    document.querySelector('#chat-title-img').src = photoProfile
    partnerTamp = event.name
    selectChat(userId, event.name)
}


function chattingAction() {
    var chatInput = document.querySelector("#chatInput");

    if (chatInput.value == '') {
        alert('please type something')
    } else {
        try {
            var payload = {
                userId: userId,
                message: chatInput.value,
                partnerId: partnerTamp
            }
            chatObj.chatting(baseURL + 'chats', payload, stompClient)
                .then(() => {
                    // createNotification(userId+ ' Mengirimi anda pesan, isi pesan : '+chatInput.value,partnerTamp)
                    document.querySelector("#chatInput").value = ''
                });
        } catch (error) {
            console.log(error)
        }
    }
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

}

function onReceiveWeb(payload) {
    var data = JSON.parse(payload.body);
    if (data.type = 'chat') {
        if (partnerTamp != undefined) {
            selectChat(userId, partnerTamp)
        }
        // selectNotification();
    } 
}