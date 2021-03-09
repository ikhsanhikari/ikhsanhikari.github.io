<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" href="css/toastr.min.css">
    <link rel="shortcut icon" href="js/img/1573277387101.png">
</head>

<body>
    <nav class="navbar navbar-expand-sm navbar-dark bgGeneralNav fixed-top">
        <a href="#" class="navbar-brand">
            <img src="js/img/gate_putih_3.png" alt="logo">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav justify-content-end navbar-collapse">
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" id="loginAction">Log In</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" id="signupAction">Sign Up</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container" style="margin-top: 100px">
        <div class="row">
            <div class="col-md-8">
                <h2 class="caption1">Start your entrepeneur journey</h2>
            </div>
            <div class="col-md-4">
                <div class="card" id="login-signup"></div>
            </div>
        </div>

    </div>
    <footer>
        <p class="caption2">Tell the world how big and powerfull you are</p>
    </footer>
</body>

<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script> -->

<script src="js/lib/date_fns.min.js"></script>
<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/popper.min.js"></script>
<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/sockjs.min.js"></script>
<script src="js/lib/stomp.min.js"></script>

<script src="js/toastr.min.js"></script>

<script src="js/global.js"></script>
<script src="js/login/login.js"></script>
<script src="js/login/login-ui.js"></script>
<script src="js/login/login-app.js"></script>

</html>

<style>
body {
    background-image: url('js/img/images-login.png');
    height: 10%;
    background-position: center;
    background-repeat: no-repeat;
    /* background-size: cover; */
    font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
}

footer {
    position: fixed;
    left: 0;
    bottom: 3;
    width: 100%;
    text-align: center;
    /* font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif; */
    /* font-family: Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif; */

    font-size: 15px
}

.caption1 {
    padding-left: 5%;
    color: black;
    font-size: 15px
}

@media only screen and (min-width: 600px) {
    body {
        background-image: url('js/img/images-login.png');
        height: 60%;
        /* background-position: center; */
        background-repeat: no-repeat;
        /* background-size: cover; */
        font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
    }

    .caption1 {
        /* color:red; */
        font-size: 25px
    }

    .caption2 {
        font-size: 15px
    }
}
</style>