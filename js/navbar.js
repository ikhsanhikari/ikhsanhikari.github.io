var navContent = ` <nav class="navbar navbar-expand-sm navbar-dark bgGeneralNav fixed-top ">
<a class="navbar-brand" href="#" onclick="gohome()">
    <img src="js/img/gate_putih_3.png"  alt="">
</a>
<button class="navbar-toggler " type="button" 
    data-toggle="collapse" 
    data-target="#navbarResponsive" 
    aria-controls="navbarResponsive" 
    aria-expanded="false" 
    aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
 </button>
 <div class="collapse navbar-collapse " id="navbarResponsive">
    <ul class="navbar-nav  navbar-collapse ml-auto " >
    <li class="navbar-item">
        <div class="form-inline">
            <div class="input-group ">
                <input type="text" class="form-control form-control-sm " placeholder="Search" list="dataUser"
                    id="searchInput">
                <div class="input-group-append">
                    <button class="btn btn-secondary btn-sm" type="button" id="btnSearch"> <span
                            class="fas fa-search"></span></button>
                </div>
            </div>
        </div>
    </li>
    </ul>
    <ul class="navbar-nav  navbar-collapse justify-content-center " >
        <li class="nav-item">
            <div class="dropdown">
                <button type="button" class="btn text-white" id="requestIcon"
                title="Collabs Request" 
                data-toggle="popover-request" 
                data-html="true" 
                data-placement="bottom" 
                data-content="<a href='#'>content</a>" 
                data-html="true">
                    <span class="fas fa-user-plus text-white"></span> 
                    Collabs Request
                    <span class="badge badge-danger" id="requestAmount"></span>
                    
                </button>
            </div>
        </li>
        <li class="nav-item">
            <div class="dropdown">
                <button type="button" id="notificationIcon"
                class="btn text-white" 
                title="Notification" 
                data-toggle="popover-notif" 
                data-html="true" 
                data-placement="bottom" 
                data-content="<a href='#'>content</a>" 
                data-html="true">
                    <span class="fas fa-bell text-white"></span>
                    Notification
                    <span class="badge badge-danger"
                        id="notifAmount"></span>
                </button>
                
            </div>
        </li>
        <li>
            <button class="btn text-white" href="#" onclick="gotoProfile()"><span class="fas fa-user-alt"></span>
            Profile</button>
        </li>
        <li class="nav-item">
            <a href="`+baseURLWEB+`new_member.php" style="text-decoration:none; color:white">
            <span class="fas fa-user-alt"></span> New member</a>
        </li>
        <li class="nav-item">
            <button class="btn text-white" href="#" id="logoutAction"><span class="fas fa-sign-out-alt"></span>
            Log Out</button>
        </li>
    </ul>
</div>
</nav>`


document.querySelector('#navBar').innerHTML = navContent

if (!localStorage.getItem('username') ) {
    window.location = baseURLWEB+'login.php';
}


$(document).ready(function () {
    $('[data-toggle="popover-notif"]').popover();
    $('[data-toggle="popover-request"]').popover();
});



const userId = localStorage.getItem('uid')
const notification = new Notification(userId);

notification.getNotification(userId).then((data) => data.json()
    .then((data) => {
        var html = ''

        var item = 0 ;

        data.data.forEach((data,index) => {
            if(data.isRead == 0){
                item++;
            }
            if(index<5){
                html += `<div class="list-group list-group-flush">
                    <div class="list-group-item">
                        ${data.message}
                    </div>
                </div>`
            }
            
        });
        html += '<a href="' + baseURLWEB + 'notification.php">View all</a>'
        if( item == 0 ){
            document.querySelector('#notifAmount').style.visibility = 'hidden'
        }else{
            document.querySelector('#notifAmount').innerHTML = item
        }
        
        document.querySelector('#notificationIcon').setAttribute('data-content', html)
    }))

const userObj = new User()
/*
userObj.getAllUser()
    .then((data) => data.json())
    .then((data) => {
        var listUser = data.data;
        listUser.forEach((item) => {
            document.querySelector('#dataUser').innerHTML += `<option ">` + item.firstName + `</option>`
        })
    })*/

const requestObj = new RequestPartner()
let iDlistRequest = []
requestObj.getRequest(localStorage.getItem('uid'))
    .then((data) => data.json())
    .then((data) => {
        if (data.itemSize == 0) {
            document.querySelector('#requestAmount').style.visibility = 'hidden';
        } else {
            document.querySelector('#requestAmount').innerHTML = data.itemSize;
        }
        var html =
            `<ul class="list-group list-group-flush" id="ulRequest">`
        if (data.itemSize > 0) {
            data.data.forEach((item,index) => {
                iDlistRequest[index] = item.id;
                if(index<5){
                    html += `<li class="list-group-item" > 
                ` + item.firstName + ` ` + item.lastName + ` 
                </li>`
                }
                
            })
        }

        html += `</ul>`
        html += `<a href="` + baseURLWEB + `request.php">View all</h6>`
        document.querySelector('#requestIcon').setAttribute('data-content', html)
    });

function gohome() {
    window.location = baseURLWEB + 'home.php';
}

document.querySelector('#btnSearch').addEventListener('click', function (e) {
    window.location = baseURLWEB + 'search.php?key=' + searchInput.value
})

document.querySelector('#logoutAction').addEventListener('click', function () {
    localStorage.removeItem('username');
    localStorage.removeItem('uid');
    window.location = baseURLWEB + 'login.php';
})

function gopartner() {
    window.location = baseURLWEB + 'partner.php';
}


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

