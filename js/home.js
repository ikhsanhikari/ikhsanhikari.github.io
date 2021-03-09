var globalUsername = localStorage.getItem('username')
var globalUID = localStorage.getItem('uid')
var nameBar = document.getElementById('nameBar');
var imgProfile = document.getElementById('imgProfile');


var listDataUser = document.querySelector("#dataUser");
var postBar = document.querySelector("#postBar");
var stompClient = null;
var postInput = document.querySelector("#postInput");
var btnPost = document.querySelector("#btnPost");
var listPostGlobal;
var test = []
var descBar = document.querySelector('#desc-bar');
var infoBar = document.querySelector('#infoBar');
var listPartner = document.querySelector("#listPartner");
var alertRole = document.querySelector("#alert-role");
var partnerTamp;
var postPhoto = '';

//calling function
selectProfile()
getProfile(globalUID)
connect()
allPartner(globalUID)

// init
const postObj = new Post();
const chatObj = new Chat();
const commentObj = new Comment();
const postUi = new PostUi(postBar);
const photoProfile = new PhotoProfile();
const notificationUi = new NotificationUi(document.querySelector('#notificationIcon'));
const core = new Core()


function createNotification(message, to) {
    notification.createNotification(baseURL + 'general_notifications', { userId: to, message: message }, stompClient)
        .then(() => {
            console.log('success create notification !');
        })
}

postObj.getAllPost(globalUID)
    .then((data) => data.json())
    .then((data) => {
        postUi.render(data);
    })


function selectProfile() {
    fetch(baseURL + 'users/gate/' + globalUsername)
        .then(data => data.json())
        .then((data) => {
            data = data.data
            nameBar.innerHTML = `<a href="` + baseURLWEB + `?username=` + globalUsername + `" style="color:black;text-decoration:none">` + data.firstName + ' ' + data.lastName + ` <br>(` + data.businessInterest + `)</a>`;
            descBar.innerHTML = data.description
            if(data.roleId == 2){
                alertRole.innerHTML = ` <strong>Success ! </strong> Your Log In As UMKM`
            }else{
                alertRole.innerHTML = ` <strong>Success ! </strong> Your Log In As User`
            }
        })
}

function gotoProfile() {
    window.location = baseURLWEB + `?username=` + globalUsername
}

async function getProfile(userId) {
    const response = await fetch(baseURL + 'profile_photos/userId/' + userId).then((data) => data
        .json())
        .then((data) => {
            if (data.data == null) {
                document.querySelector('#imgPost').src = 'js/img/user.png';
                imgProfile.src = 'js/img/user.png';
            } else {
                document.querySelector('#imgPost').src = data.data.url;
                imgProfile.src = data.data.url;
            }
        })
}


function listRequest() {
    const requestObj = new RequestPartner()
    requestObj.getRequest(localStorage.getItem('uid'))
        .then((data) => data.json())
        .then((data) => {
            if (data.itemSize == 0) {
                requestAmount.visibility = hidden;
            } else {
                requestAmount.innerHTML = data.itemSize;
            }
            var html =
                `<ul class="list-group list-group-flush" id="ulRequest">`
            if (data.itemSize > 0) {
                data.data.forEach((item) => {
                    html += `<li class="list-group-item" > 
            ` + item.firstName + ` ` + item.lastName + ` 
            </li>`
                })
            }

            html += `</ul>`
            html += `<a href="` + baseURLWEB + `request.php">View all</h6>`
            document.querySelector('#requestIcon').setAttribute('data-content', html)
        });
}

async function confirm(url = '', data = {}) {
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
    listRequest()
}

function confirmAction(partnerId) {
    try {
        console.log(partnerId)
        var payload = {
            userId: localStorage.getItem('uid'),
            partnerId: partnerId
        }
        confirm(baseURL + 'partners/confirm', payload);
    } catch (error) {

    }
    // me.disabled = true;
    // me.innerHTML = 'You\'re Partner'
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
        allPartner(localStorage.getItem('uid'))
    } else if (data.type == 'post') {
        postObj.getAllPost(globalUID)
            .then((data) => data.json())
            .then((data) => {
                postUi.render(data);
            })

    } else if (data.type = 'chat') {
        if (partnerTamp != undefined) {
            selectChat(globalUID, partnerTamp)
        }
        selectNotification();
    } else if (data.type == 'comment') {
        selectNotification();
    }
}



function commentPost(event) {
    // document.querySelector('#footer'+event.id).classList.remove('collapse')
    text = document.querySelector("#comment" + event.id).value
    postID = event.id
    loadingComment = document.querySelector("#loading-comment" + event.id)
    loadingComment.innerHTML = `<div class="spinner-grow spinner-grow-sm"></div>
                                <div class="spinner-grow spinner-grow-sm"></div>
                                <div class="spinner-grow spinner-grow-sm"></div>`
    if (text == '') {
        loadingComment.innerHTML = ``
        alert('please type something')
    } else {
        try {
            var payload = {
                userId: globalUID,
                postId: postID,
                firstComment: text
            }
            commentObj.comment(baseURL + 'first_comments', payload, stompClient)
                .then(() => {
                    console.log('success comment !')
                    stompClient.send('/app/notif/login', {}, JSON.stringify(
                        {
                            username: localStorage.getItem('username'),
                            type: "comment"
                        },
                    ))
                });

        } catch (error) {
            console.log(error)
        }
    }


}


function postingAction() {
    document.querySelector("#loading-post").innerHTML = `<hr><div class="spinner-grow spinner-grow-sm"></div>
    <div class="spinner-grow spinner-grow-sm"></div>
    <div class="spinner-grow spinner-grow-sm"></div>`;

    if (postInput.value == '') {
        document.querySelector('#loading-post').innerHTML = '';
        alert('please type something')
    } else {
        var payload = {
            userId: globalUID,
            post: postInput.value,
            urlPhoto: document.querySelector('#urlPhoto').value
        }
        if(btnPost.innerHTML == 'Post'){
            postObj.posting(baseURL + 'posts', payload, stompClient)
            .then(() => {
                console.log('success posting !');
                postInput.value = '';
            });
        }else{
            core.patchData(baseURL+'posts/'+document.querySelector('#idPost').value,
                payload
            ).then((data)=>{
                console.log('success update posting ! '+JSON.stringify(payload));
                stompClient.send('/app/notif/login', {}, JSON.stringify(
                    {
                        username: localStorage.getItem('username'),
                        type: "post"
                    }
                ))
            }).catch((err)=>{
                console.log(err)
            })
        }
        
    }
}

btnPost.addEventListener('click', postingAction)




async function allPartner(userId) {
    listPartner.innerHTML = ''
    const response = await fetch(baseURL + 'partners/' + userId)
        .then((data) => data.json())
        .then((data) => {
            data.data.forEach((item) => {

                if (item.photoProfile == null ) {
                    item.photoProfile = 'js/img/user.png'
                }

                listPartner.innerHTML += `<div class="block">
                <button class="editItemButton btn btn-default" 
                    onclick="chatRoom(this,'` + item.firstName + `','` + item.photoProfile + `')" 
                    name="` + item.id + `" data-toggle="modal" 
                    data-target="#chatRoomModal"> <span class="fas fa-comments"></span></button>
               
                <img src="`+ item.photoProfile + `" >
                <h4 style="font-size:15px; font-weight:11px">` + item.firstName + ` ` + item.lastName + `</h4><br>
                                        <span class="text-description"></span> 
                                    
                </div>`
            })
        })
}

async function selectChat(from, to) {
    var chatBar = document.querySelector('#chat');
    const response = await fetch(baseURL + 'chats/specific?from=' + from + '&to=' + to + '')
        .then((data) => data.json())
        .then((data) => {
            chatBar.innerHTML = ''
            data.data.forEach((item) => {
                if (item.userId == globalUID) {
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

    if(photoProfile == null){
        document.querySelector('#chat-title-img').src = 'js/img/user.png'
    }else{
        document.querySelector('#chat-title-img').src = photoProfile
    }
    partnerTamp = event.name
    selectChat(globalUID, event.name)
}


function chattingAction() {
    var chatInput = document.querySelector("#chatInput");

    if (chatInput.value == '') {
        alert('please type something')
    } else {
        try {
            var payload = {
                userId: globalUID,
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


function selectNotification() {
    notification.getNotification(userId).then((data) => data.json()
        .then((data) => {
            var html = ''

            var item = 0;

            data.data.forEach((data, index) => {
                if (data.isRead == 0) {
                    item++;
                }
                if (index < 5) {
                    html += `<div class="list-group list-group-flush">
                    <div class="list-group-item">
                        ${data.message}
                    </div>
                </div>`
                }

            });
            html += '<a href="' + baseURLWEB + 'notification.php">View all</a>'
            if (item == 0) {
                document.querySelector('#notifAmount').style.visibility = 'hidden'
            } else {
                document.querySelector('#notifAmount').innerHTML = item
            }

            document.querySelector('#notificationIcon').setAttribute('data-content', html)
        }))
}

var multipleUploadForm = document.querySelector('#multipleUploadForm');
var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');
var multipleFileUploadError = document.querySelector('#multipleFileUploadError');
var multipleFileUploadSuccess = document.querySelector('#multipleFileUploadSuccess');


function uploadMultipleFiles(files) {
    var formData = new FormData();
    for (var index = 0; index < files.length; index++) {
        formData.append("files", files[index]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseURL + "uploadMultipleFiles");

    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
            multipleFileUploadError.style.display = "none";
            var content = "<p>All Files Uploaded Successfully</p>";
            for (var i = 0; i < response.length; i++) {
                // content += "<p>DownloadUrl : <a href='" + response[i].fileDownloadUri + "' target='_blank'>" +
                //     response[i].fileDownloadUri + "</a></p>";
                document.querySelector('#urlPhoto').value = response[i].fileDownloadUri;
            }
            multipleFileUploadSuccess.innerHTML = content;
            multipleFileUploadSuccess.style.display = "block";
        } else {
            multipleFileUploadSuccess.style.display = "none";
            multipleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
    };

    xhr.send(formData);
}
document.querySelector('#multipleFileUploadInput').addEventListener('change',
    function (event) {
        var files = multipleFileUploadInput.files;
        if (files.length === 0) {
            multipleFileUploadError.innerHTML = "Please select at least one file";
            multipleFileUploadError.style.display = "block";
        }
        uploadMultipleFiles(files);
        event.preventDefault();
    })


function getPost(id) {
    multipleFileUploadSuccess.innerHTML = '';
    core.getDataById(baseURL + 'posts/' + id).then((data) => data.json())
        .then((data) => {
            document.querySelector('#postInput').value = data.data.post ;
            document.querySelector('#idPost').value = data.data.id;
            document.querySelector('#urlPhoto').value = data.data.urlPhoto
            btnPost.innerHTML = 'Update'
        })
}

function resetPost(){
    document.querySelector('#postInput').value = '';
    document.querySelector('#idPost').value = '';
    document.querySelector('#urlPhoto').value = ''
    multipleFileUploadSuccess.innerHTML = '';

    btnPost.innerHTML = 'Post'
}

function interst(event,postID){
    if(event.innerHTML == 'interest'){
        payload = {
            userId : userId,
            postId : postID,
            isInterest: true
        }
        core.postData(baseURL+'interest',payload).then(()=>{
            event.innerHTML = '<span class="fas fa-thumbs-up"></span> interested'
        })
    }else{
        core.fetchData(baseURL+'interest/un_interest/'+userId+'/'+postID).then(()=>{
            event.innerHTML = 'interest'
        })
    }
    
}
core.fetchData(baseURL+'interest/user/'+userId).then((response)=>response.json()).then((response)=>{
    console.log(response)
})

function showInterest(id) {
    multipleFileUploadSuccess.innerHTML = '';
    core.getDataById(baseURL + 'interest/post/' + id).then((data) => data.json())
        .then((data) => {
            document.querySelector('#interestBusiness').innerHTML = '';
            data.data.forEach((item)=>{
                if(item.users.photoProfile == null ){
                    item.users.photoProfile = 'js/img/user.png'
                }
                document.querySelector('#interestBusiness').innerHTML += `
                            <div class="block">
                            <img src="`+item.users.photoProfile+`" width:"40px" height="40px"/>
                            <a href="`+baseURLWEB+`?username=`+item.users.username+`"><h4>`+item.users.firstName+`</h4></a>
                            </div>
                `;
            })
        })
}