var loginSignup = document.querySelector('#login-signup');
var loginAction = document.querySelector('#loginAction');
var signupAction = document.querySelector('#signupAction');

const loginUi = new LoginUi();
const loginObj = new Login();

loginUi.render()

loginAction.addEventListener('click', function (e) {
    loginUi.render();
    loginSignup.innerHTML = loginUi.renderLogin();
})

signupAction.addEventListener('click', function (e) {
    loginUi.render()
    loginSignup.innerHTML = loginUi.renderSignup();
})

function signup() {
    var firstName = document.querySelector('#firstname').value;
    var lastName = document.querySelector('#lastname').value;
    var description = document.querySelector('#description').value;
    var phoneNumber = document.querySelector('#phone').value;
    var role = document.querySelector('#role').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var business = document.querySelector('#business').value;
    var address = document.querySelector('#address').value;

    if (firstName == '' || lastName == '' || description == '' ||
        phoneNumber == '' || email == '' || password == '' || business == '0') {
        toastr.error('All must be filled !!')
    } else {
        var payload = {
            firstName: firstName,
            lastName: lastName,
            description: description,
            phoneNumber: phoneNumber,
            roleId: role,
            email: email,
            password: password,
            businessInterest:business,
            address: address
        }
        try {
            loginObj.postSignup(baseURL + 'users', payload).then((data) => {
                if (data.ok) {
                    toastr.info('Sign Up Success !!')
                    alert('Thanks For Sign Up')
                    loginSignup.innerHTML = loginContent;
                } else {
                    toastr.error('Email has been already exist !!')
                }

            })
        } catch (error) {
            console.log('error')
        }
    }
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
        loginObj.postLogin(baseURL + 'users/gate/login', {
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
