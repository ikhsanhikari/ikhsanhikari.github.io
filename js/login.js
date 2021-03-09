var loginSignup = document.querySelector('#login-signup');
var loginAction = document.querySelector('#loginAction');
var signupAction = document.querySelector('#signupAction');

// var loginContent = `<div class="card-header bgGeneral ">
//                                Form Log In
//                             </div>
//                             <div class="card-body">
//                                     <div class="row">
//                                         <div class="col-md-12">
//                                             <div class="form-group">
//                                                 <label for="email">Email</label>
//                                                 <input type="email" id="email" class="form-control">
//                                             </div>
//                                             <div class="form-group">
//                                                 <label for="password">Password</label>
//                                                 <input type="password" id="password" class="form-control">
//                                             </div>
//                                             <button class="btn bgGeneral" onclick="login(this)">Log In</button>
//                                             <div class="responseErrorLogin alert "></div>
//                                         </div>
//                                     </div>
//                             </div>`;
var signupContent = `<div class="card-header bgGeneral ">
                        Form Sign Up
                    </div>
                    <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="firstname">First Name</label>
                                        <input type="text" id="firstname" class="form-control form-control-sm">
                                    </div>
                                    <div class="form-group">
                                        <label for="lastname">Last Name</label>
                                        <input type="text" id="lastname" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">Phone Number </label>
                                        <input type="text" id="phone" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" id="password" class="form-control">
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" value="Male" name="gender" id="gender">Male
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" value="Female" name="gender" id="gender">Female
                                        </label>
                                    </div>
                                    <br><br>
                                    <div class="form-group">
                                        <label for="description">Description </label>
                                        <textarea id="description" cols="30" rows="5" class="form-control"></textarea>
                                    </div>
                                    <br>
                                    <button class="btn bgGeneral" onclick="signup()">Sign Up</button>
                                </div>
                            </div>
                    </div>`;
loginSignup.innerHTML = signupContent;

loginAction.addEventListener('click', function (e) {
    // loginSignup.innerHTML = loginContent;
})

signupAction.addEventListener('click', function (e) {
    loginSignup.innerHTML = signupContent;
})

async function postSignup(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
}

function signup() {
    var firstName = document.querySelector('#firstname').value;
    var lastName = document.querySelector('#lastname').value;
    var description = document.querySelector('#description').value;
    var phoneNumber = document.querySelector('#phone').value;
    var gender = document.querySelector('#gender').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    if(firstName =='' || lastName == '' || description == '' ||
    phoneNumber == '' || email == '' || password == ''){
        toastr.error('All must be filled !!')
    }else{
        var payload = {
            firstName: firstName,
            lastName: lastName,
            description: description,
            phoneNumber: phoneNumber,
            gender: gender,
            email: email,
            password: password
        }
        try {
            postSignup(baseURL + 'users', payload).then((data)=>{
                if(data.ok){
                    toastr.info('Sign Up Success !!')
                    loginSignup.innerHTML = loginContent;
                }else{
                    toastr.error('Email has been already exist !!')
                }
                
            })
        } catch (error) {
            console.log('error')
        }
    }
}

async function postLogin(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}

function login(event) {
    event.innerHTML = 'Log In <span class="spinner-border spinner-border-sm"></span>';
    var responseError = document.querySelector('.responseErrorLogin');

    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    if (email == '' || password == '') {
        event.innerHTML = 'Log In';
        responseError.innerHTML = `<span style="color:red; font-size:12px">Please  Enter Email and Password</span>`
    } else {
        postLogin(baseURL + 'users/gate/login', {
            username: email,
            password: password
        }).then((data) => {
            if (data.ok) {
                return data.json()
            } else {
                console.log('tidak ok')
                throw new Error('Failed To Login')
            }
        })
            .then((data) => {
                uname = data.data.username
                window.location = baseURLWEB + 'home.php';
                localStorage.setItem("username", uname)
                localStorage.setItem("uid", data.data.id)

            }).catch((error) => {
                event.innerHTML = 'Log In';
                responseError.innerHTML = `<span style="color:red; font-size:12px">Failed Login, Please Try Again</span>`
            })
    }
}


var testNotif = document.querySelector('#testNotif');

//websocket 
var stompClient = null;

function connect() {
    var socket = new SockJS(baseURL + 'javatechie');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, function () {
        alert('error')
    });
}

function onConnected() {
    stompClient.subscribe('/topic/public', function (data) {
        testNotif.innerHTML = 'aku is login';
    });

    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({ sender: 'username', type: 'JOIN' })
    )
}
