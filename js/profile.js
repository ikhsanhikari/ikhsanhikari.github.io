
var singleUploadForm = document.querySelector('#singleUploadForm');
var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
var singleFileUploadError = document.querySelector('#singleFileUploadError');
var singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

var formPhotoProfile = document.querySelector('#formPhotoProfile');
var filePhotoProfile = document.querySelector('#filePhotoProfile');
var fileProfileError = document.querySelector('#fileProfileError');
var fileProfileSuccess = document.querySelector('#fileProfileSuccess');

var btnAchievement = document.querySelector('#saveAchievement');
var btnExperience = document.querySelector('#btnExperience');
var btnEducation = document.querySelector('#btnEducation');

var stompClient = null;

var experienceBar = document.querySelector('#experienceBar');
// var aboutBar = document.querySelector('#aboutBar');
var achievementBar = document.querySelector('#achievementBar');
var educationBar = document.querySelector('#educationBar');
var psection = document.querySelector('#psection');
var btnCollabs = document.querySelector('#btnCollabs');
var requestAmount = document.querySelector('#requestAmount');
var listCollabBar = document.querySelector('#listCollabBar');
var listPartner = document.querySelector("#listPartner");
var globalUsername = findGetParameter("username");
var btnAddExperience = document.querySelector('#btnAddExperience')
var btnAddEducation = document.querySelector('#btnAddEducation')
var btnAddAchievement = document.querySelector('#btnAddAchievement')
var btnAddAbout = document.querySelector('#btnAddAbout')

var experienceRow = document.querySelector('#experienceRow')
var achievementRow = document.querySelector('#achievementRow')
var educationRow = document.querySelector("#educationRow")
// var aboutRow = document.querySelector("#aboutRow")

var infoBar = document.querySelector('#infoBar');
var desBar = document.querySelector('#desBar');
var contactInfo = document.querySelector('#contactInfo');
var profileBar = document.querySelector('#profileBar');



var thisUid;


// const userObj = new User();
const core = new Core();


/*var multipleUploadForm = document.querySelector('#multipleUploadForm');
var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');
var multipleFileUploadError = document.querySelector('#multipleFileUploadError');
var multipleFileUploadSuccess = document.querySelector('#multipleFileUploadSuccess');*/


// call function



connect();
selectProfile();



// is me ?
if (findGetParameter('username') != localStorage.getItem('username')) {
    psection.style.visibility = 'hidden';
    btnAddExperience.style.visibility = 'hidden';
    btnAddEducation.style.visibility = 'hidden';
    btnAddAchievement.style.visibility = 'hidden';
    // btnAddAbout.style.visibility = 'hidden'
} else {
    btnCollabs.style.visibility = 'hidden'
}


function uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseURL + "uploadFile");

    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
            singleFileUploadError.style.display = "none";
            document.getElementById('photoSampul').style.backgroundImage = "url(" + response.fileDownloadUri + ")";
            singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" +
                response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
            singleFileUploadSuccess.style.display = "block";
            try {
                core.postData(baseURL + 'cover_photos', {
                    userId: localStorage.getItem('uid'),
                    url: response.fileDownloadUri,
                    isApply: true
                }).
                    then(() => {
                        console.log('success change cover !')
                    })

                userObj.updatePhotoCover(baseURL + 'users/photo_cover/update', { id: userId, url: response.fileDownloadUri })
                    .then((data) => data.json())
                    .then(() => {
                        document.querySelector('#btnUploadCover').innerHTML = `Submit`
                    })
            } catch (error) {
                console.log('error : ', error)
            }
        } else {
            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
    };

    xhr.send(formData);
}

function uploadSingleFileProfile(file) {
    var formData = new FormData();
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseURL + "uploadFile");

    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
            singleFileUploadError.style.display = "none";
            document.getElementById('photoProfile').src = response.fileDownloadUri;
            fileProfileSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" +
                response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
            fileProfileSuccess.style.display = "block";
            try {
                core.postData(baseURL + 'profile_photos', {
                    userId: localStorage.getItem('uid'),
                    url: response.fileDownloadUri,
                    isApply: true
                }).then(() => {
                    console.log('success change profile')
                })

                userObj.updatePhotoProfile(baseURL + 'users/photo_profile/update', { id: userId, url: response.fileDownloadUri })
                    .then((data) => data.json())
                    .then(() => {
                        document.querySelector('#btnUploadProfile').innerHTML = `Submit`
                    })
            } catch (error) {
                console.log('error : ', error)
            }

        } else {
            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
    };

    xhr.send(formData);
}

function uploadMultipleFiles(files) {
    var formData = new FormData();
    for (var index = 0; index < files.length; index++) {
        formData.append("files", files[index]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadMultipleFiles");

    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
            multipleFileUploadError.style.display = "none";
            var content = "<p>All Files Uploaded Successfully</p>";
            for (var i = 0; i < response.length; i++) {
                content += "<p>DownloadUrl : <a href='" + response[i].fileDownloadUri + "' target='_blank'>" +
                    response[i].fileDownloadUri + "</a></p>";
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

singleUploadForm.addEventListener('submit', function (event) {
    document.querySelector('#btnUploadCover').innerHTML = `<span class="spinner-border spinner-border-sm"></span>
    Loading..`
    var files = singleFileUploadInput.files;
    if (files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);

formPhotoProfile.addEventListener('submit', function (event) {
    document.querySelector('#btnUploadProfile').innerHTML = `<span class="spinner-border spinner-border-sm"></span>
    Loading..`
    var files = filePhotoProfile.files;
    if (files.length === 0) {
        fileProfileError.innerHTML = "Please select a file";
        fileProfileError.style.display = "block";
    }
    uploadSingleFileProfile(files[0]);
    event.preventDefault();
}, true);


/*multipleUploadForm.addEventListener('submit', function (event) {
    var files = multipleFileUploadInput.files;
    if (files.length === 0) {
        multipleFileUploadError.innerHTML = "Please select at least one file";
        multipleFileUploadError.style.display = "block";
    }
    uploadMultipleFiles(files);
    event.preventDefault();
}, true);*/


//Achievement Process
btnAchievement.addEventListener('click', function () {
    var courseName = document.querySelector('#courseName').value
    var associatedWith = document.querySelector('#assosiatedWith').value
    if (courseName == '' || associatedWith == '') {
        toastr.error('Type something !!, Achievement not update because some input is empty')
    } else {
        if(this.innerHTML == 'Save'){
            core.postData(baseURL + 'achievements', {
                userId: userId,
                courseName: courseName,
                associatedWith: associatedWith
            }).then(() => {
                selectProfile();
                document.querySelector('#courseName').value = ''
                document.querySelector('#assosiatedWith').value = ''
                toastr.success('Success Add Achievement !!')
            }).catch((err) => {
                console.error(err);
            });
        }else{
            core.patchData(baseURL + 'achievements/'+document.querySelector('#idAchievement').value, {
                userId: userId,
                courseName: courseName,
                associatedWith: associatedWith
            }).then(() => {
                selectProfile();
                document.querySelector('#courseName').value = ''
                document.querySelector('#assosiatedWith').value = ''
                toastr.success('Success Update Achievement !!')
            }).catch((err) => {
                console.error(err);
            });
        }
        
    }

})

function deleteAchievement(id) {
    core.deleteData(baseURL + 'achievements/' + id)
        .then(() => {
            selectProfile()
        })
        .catch((err) => {
            console.log(err)
        })
}

function getAchievement(id){
    core.getDataById(baseURL+'achievements/'+id).then((data)=>data.json())
    .then((data)=>{
        document.querySelector('#courseName').value = data.data.courseName;
        document.querySelector('#assosiatedWith').value = data.data.associatedWith;
        document.querySelector('#idAchievement').value = data.data.id;
        
        btnAchievement.innerHTML = 'Update'
    })
}

function resetFormAchievement(){
    document.querySelector('#courseName').value = '';
    document.querySelector('#assosiatedWith').value = '';
    btnAchievement.innerHTML = 'Save'
}

//Experience Process
btnExperience.addEventListener('click', function () {
    var title = document.querySelector('#title').value
    var company = document.querySelector('#company').value
    var location = document.querySelector('#location').value
    if (title == '' || company == '' || location == '') {
        toastr.error('Type something !!, Experiences not update because some input is empty')
    } else {
        if(this.innerHTML == 'Save'){
            core.postData(baseURL + 'experiences', {
                userId: userId,
                title: title,
                company: company,
                location: location
            }).then(() => {
                selectProfile();
                document.querySelector('#title').value = ''
                document.querySelector('#company').value = ''
                document.querySelector('#location').value = ''
                toastr.success('Success Add Experiences !!')
            }).catch((err) => {
                console.error(err);
            });
        }else{
            core.patchData(baseURL + 'experiences/'+document.querySelector('#idExperience').value, {
                userId: userId,
                title: title,
                company: company,
                location: location
            }).then(() => {
                selectProfile();
                document.querySelector('#title').value = ''
                document.querySelector('#company').value = ''
                document.querySelector('#location').value = ''
                toastr.success('Success Update Experiences !!')
            }).catch((err) => {
                console.error(err);
            });
        }   
    }
})

function getExperience(id){
    core.getDataById(baseURL+'experiences/'+id).then((data)=>data.json())
    .then((data)=>{
        document.querySelector('#title').value = data.data.title;
        document.querySelector('#company').value = data.data.company;
        document.querySelector('#location').value = data.data.location;
        document.querySelector('#idExperience').value = data.data.id;
        
        btnExperience.innerHTML = 'Update'
    })
}

function deleteExperience(id) {
    core.deleteData(baseURL + 'experiences/' + id)
        .then(() => {
            selectProfile()
        })
        .catch((err) => {
            console.log(err)
        })
}

function resetFormExperience(){
    document.querySelector('#title').value = '';
    document.querySelector('#company').value = '';
    document.querySelector('#location').value = '';
    btnAchievement.innerHTML = 'Save'
}

//Education Process
btnEducation.addEventListener('click', function () {
    var school = document.querySelector('#school').value
    var degree = document.querySelector('#degree').value
    var fieldOfStudy = document.querySelector('#fieldOfStudy').value
    if (title == '' || company == '' || location == '') {
        toastr.error('Type something !!, Education not update because some input is empty')
    } else {
        if(this.innerHTML == 'Save'){
            core.postData(baseURL + 'educations', {
                userId:userId,
                school: school,
                degree: degree,
                fieldOfStudy: fieldOfStudy
            }).then(() => {
                selectProfile();
                document.querySelector('#title').value = ''
                document.querySelector('#company').value = ''
                document.querySelector('#location').value = ''
                toastr.success('Success Add Educations !!')
            }).catch((err) => {
                console.error(err);
            });
        }else{
            core.patchData(baseURL + 'educations/'+document.querySelector('#idEducation').value, {
                userId: userId,
                school: school,
                degree: degree,
                fieldOfStudy: fieldOfStudy
            }).then(() => {
                selectProfile();
                document.querySelector('#school').value = ''
                document.querySelector('#degree').value = ''
                document.querySelector('#fieldOfStudy').value = ''
                toastr.success('Success Update Educations !!')
            }).catch((err) => {
                console.error(err);
            });
        }   
    }
})

function getEducation(id){
    core.getDataById(baseURL+'educations/'+id).then((data)=>data.json())
    .then((data)=>{
        document.querySelector('#school').value = data.data.school;
        document.querySelector('#degree').value = data.data.degree;
        document.querySelector('#fieldOfStudy').value = data.data.fieldOfStudy;
        document.querySelector('#idEducation').value = data.data.id;
        
        btnEducation.innerHTML = 'Update'
    })
}

function deleteEducation(id) {
    core.deleteData(baseURL + 'educations/' + id)
        .then(() => {
            selectProfile()
        })
        .catch((err) => {
            console.log(err)
        })
}

function resetFormEducation(){
    document.querySelector('#school').value = '';
    document.querySelector('#degree').value = '';
    document.querySelector('#fieldOfStudy').value = '';
    btnAchievement.innerHTML = 'Save'
}




async function getCover(userId) {
    const response = await fetch(baseURL + 'cover_photos/userId/' + userId).then((data) => data.json())
        .then((data) => {
            var url = '';
            if (data.data == null ) {
                url = 'js/img/default_cover_photo.png';
            } else {
                url = data.data.url;
            }
            document.getElementById('photoSampul').style.backgroundImage = "url(" + url + ")";
        })
    return response;
}

async function getProfile(userId) {
    const response = await fetch(baseURL + 'profile_photos/userId/' + userId).then((data) => data
        .json())
        .then((data) => {
            var url = '';
            if (data.data == null  ) {
                url = 'js/img/user.png';
            } else {
                url = data.data.url;
            }
            document.getElementById('photoProfile').src = url;
        })
    return response;
}

function selectProfile() {
    fetch(baseURL + 'users/gate/' + globalUsername)
        .then((response) => {
            if(response.ok)
               return response.json()
            else    
                window.location = baseURLWEB+'not_found.php'
        })
        .then(data => {
            desBar.innerHTML = data.data.description
            contactInfo.innerHTML = `
                                    <table cellpadding="5">
                                        <tr>
                                            <td><span class="fas fa-phone"></span></td>
                                            <td>:</td>
                                            <td>`+ data.data.phoneNumber + `</td>
                                        </tr>
                                        <tr>
                                            <td><span class="fas fa-envelope"></span></td>
                                            <td>:</td>
                                            <td>`+ data.data.email + `</td>
                                        </tr>
                                        <tr>
                                            <td><span class="fas fa-address-book"></span></td>
                                            <td>:</td>
                                            <td>`+ data.data.address + `</td>
                                        </tr>
                                    </table>`

            document.getElementById('nameBar').innerHTML = data.data.firstName + ' ' + data.data.lastName;

            thisUid = data.data.id;

            getCover(thisUid)
            getProfile(thisUid)
            allPartner(thisUid)

            //experience
            var listExperience = data.data.experiences;
            var experienceContent = ``;
            if (listExperience.length == 0) {
                experienceRow.remove()
            }
            
            listExperience.forEach((item) => {
                var btnUpdateExperience = ``;
                if(localStorage.getItem('username') == findGetParameter('username')){
                    btnUpdateExperience = `<button class=" editItemButton btn btn-default" onclick="getExperience('`+item.id+`')" 
                    data-toggle="modal"
                    data-target="#experienceModal">
                    <span class="fas fa-pen"></span></button>
                    <button class=" deleteItemButton btn btn-default" onclick="deleteExperience('`+item.id+`')"> 
                    <span class="fas fa-trash" ></span></button>`
                }
                

                experienceContent += `
                `+btnUpdateExperience+`
                <h6>` + item.title + `</h6>
                                        <p class="text-description"> 
                                            <span>` + item.company + `</span> <br>
                                            <span>` + item.location + `</span>
                                        </p><hr>`
            })

            experienceBar.innerHTML = experienceContent;

            //about
            // aboutBar.innerHTML = data.data.description;
            // if (data.data.description == '') {
            //     aboutRow.remove()
            // }

            //achievement
            achievementContent = `<h6>Course</h6>`;

            var listAchievement = data.data.achievements;
            if (listAchievement.length == 0) {
                achievementRow.remove()
            }
            listAchievement.forEach((item) => {
                var btnUpdateAchievement = ``
                if(localStorage.getItem('username') == findGetParameter('username')){
                    btnUpdateAchievement = `<button class=" editItemButton btn btn-default" data-toggle="modal"
                        data-target="#achievementModal" onclick="getAchievement('`+item.id+`')"> 
                        <span class="fas fa-pen"></span></button>
                        <button class=" deleteItemButton btn btn-default"  
                        onclick="deleteAchievement('`+ item.id + `')" > 
                        <span class="fas fa-trash"></span></button>`
                }
                achievementContent += `
                                    `+btnUpdateAchievement+`
                                    <p class="text-description">
                                        <span><b>` + item.courseName + `</b>  </span><br>
                                        <span>` + item.associatedWith + `</span>
                                    </p><hr>`;
            })
            achievementBar.innerHTML = achievementContent;

            //education
            var listEducation = data.data.educations;
            if (listEducation.length == 0) {
                educationRow.remove();
            }
            
            var educationContent = ``;
            listEducation.forEach((item) => {
                var btnUpdateEducation = ``
                if(localStorage.getItem('username') == findGetParameter('username')){
                    btnUpdateEducation = `<button class=" editItemButton btn btn-default" 
                    onclick="getEducation('`+item.id+`')"
                    data-toggle="modal"
                    data-target="#educationModal" > 
                    <span class="fas fa-pen"></span></button>
                        <button class=" deleteItemButton btn btn-default" onclick="deleteEducation('`+item.id+`')" > 
                        <span class="fas fa-trash"></span></button>`
                }
                educationContent += `
                    `+btnUpdateEducation+`
                        <h6>` + item.school + `</h6>
                                        <p class="text-description"> 
                                            <span>` + item.degree + `</span> <br>
                                            <span>` + item.fieldOfStudy + `</span>
                                        </p><hr>`
            })

            educationBar.innerHTML = educationContent;

            checkCollabs(data.data.id)

            listRequest(localStorage.getItem('uid'))

        })
        .catch(error => console.error(error))
}





btnCollabs.addEventListener('click', function () {
    var payload = {
        userId: localStorage.getItem('uid'),
        partnerId: thisUid
    }
    core.postData(baseURL + 'partners/request', payload)
        .then(() => {
            btnCollabs.disabled = true
            btnCollabs.innerHTML = 'Request is sent'
            stompClient.send('/app/notif/login', {}, JSON.stringify(
                {
                    username: localStorage.getItem('username'),
                    type: "collabs"
                },
            ))
        })
})

async function checkCollabs(uid) {
    const response = await fetch(baseURL + 'partners/check/' + localStorage.getItem('uid') + '/' + uid)
        .then((data) => data.json())
        .then((data) => {
            if (iDlistRequest.includes(uid)) {
                btnCollabs.disabled = true
                btnCollabs.innerHTML = 'please confirm first'
            } else if (data.data == null) {
                btnCollabs.disabled = false
                btnCollabs.innerHTML = 'Collabs'
            } else if (data.data.isConfirm == false) {
                btnCollabs.disabled = true
                btnCollabs.innerHTML = 'Request is sent'
            } else {
                btnCollabs.disabled = true
                btnCollabs.innerHTML = 'You are partner'
            }

        })
    return response;


}


async function listRequest(uid) {
    const response = await fetch(baseURL + 'partners/request/' + uid)
        .then((data) => data.json())
        .then((data) => {
            var user = data;
            if (data.itemSize == 0) {
                requestAmount.style.visibility = 'hidden';
            } else {
                requestAmount.innerHTML = data.itemSize;
            }

            var html =
                `<ul class="list-group list-group-flush" id="ulRequest">`
            if (data.itemSize > 0) {
                user.data.forEach((item) => {
                    html += `<li class="list-group-item" > 
                    ` + item.firstName + ` ` + item.lastName + ` 
                    </li>`
                })
            }

            html += `</ul>`
            html += `<a href='` + baseURLWEB + `request.php'>View all</h6>`
            document.querySelector('#requestIcon').setAttribute('data-content', html)
        })
    return response;
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
    listRequest(localStorage.getItem('uid'))
}

function confirmAction(partnerId, me) {
    try {
        console.log(partnerId)
        var payload = {
            userId: localStorage.getItem('uid'),
            partnerId: partnerId
        }
        confirm(baseURL + 'partners/confirm', payload);
    } catch (error) {

    }
    me.disabled = true;
    me.innerHTML = 'You\'re Partner'
}


async function allPartner(userId) {
    await fetch(baseURL + 'partners/' + userId)
        .then((data) => data.json())
        .then((data) => {
            infoBar.innerHTML = '<a href="' + baseURLWEB + 'partner.php">' + data.itemSize + ' Partner <br> <a href="#" data-toggle="modal" data-target="#contactModal" >Contact Info</a>'
        })
}

//websocket 
function connect() {
    var socket = new SockJS(baseURL + 'javatechie');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, function (error) {
        console.log('web connection cutted ' + error)
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
        listRequest(localStorage.getItem('uid'))
        selectNotification()
    } else if (data.type == 'confirm') {
        allPartner(thisUid)
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