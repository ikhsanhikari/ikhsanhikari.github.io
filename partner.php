<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Partner</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/toastr.min.css">
    <link rel="shortcut icon" href="js/img/1573277387101.png">
</head>

<body>
    <nav id="navBar"></nav>
    <div class="container" style="margin-top:100px">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header bgGeneral">Partner</div>
                    <div class="card-body">
                        <div id="list-partner"></div>
                        
                    </div>
                </div>
                
            </div>
        </div>

    </div>

</body>

<div class="modal" id="chatRoomModal">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header btnBgGeneral ">
                <div class="block">
                    <img src="" alt="Photo Profile" id="chat-title-img">
                    <h4 class="modal-title text-description-2" id="chat-title"></h4>
                </div>
                <button type="button" class="close" data-dismiss="modal">×</button>
            </div>
            <div class="modal-body" style="background-color:#d4e3ff">
                <div id="chat">

                </div>
                <div style="margin-top:5%">
                    <textarea placeholder="Type Chat Here" class="form-control" id="chatInput"></textarea><br>
                    <button class="btn btn-outline-dark" onclick="chattingAction()">Send</button>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
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

<script src="js/global.js"></script>
<script src="js/user/user.js"></script>
<script src="js/notification/notification.js"></script>
<script src="js/request/request.js"></script>
<script src="js/chat/chat.js"></script>

<script src="js/navbar.js"></script>
<script src="js/photo_profile/photoProfile.js"></script>
<script src="js/partner/partner-ui.js"></script>
<script src="js/partner/partner.js"></script>
<script src="js/partner/partner-app.js"></script>

</html>

<style>
body{
    background-color:#f0f0f0;
}
</style>