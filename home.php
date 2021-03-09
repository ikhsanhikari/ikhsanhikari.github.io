<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/toastr.min.css">
    <link rel="shortcut icon" href="js/img/1573277387101.png">
</head>

<body>
    <div id="navBar">
    </div>

    <div class="container" style="margin-top: 100px">
        <div class="alert alert-info">
            <div id="alert-role">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-row">
                            <div class="p-2">
                                <img src="" id="imgPost" onError="this.onerror=null;this.src='/js/img/user.png';" width="50" height="50" alt="">
                            </div>
                            <div class="p-2">
                                <a href="#" data-toggle="modal" data-target="#postModal" onclick="resetPost()">
                                    <h5>
                                        <span class="fas fa-pen"></span> Create Posting
                                    </h5>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- <input type="text" class="form-control" data-toggle="modal" data-target="#postModal"
                    placeholder="Click here for posting" onclick="resetPost()"> -->
                <div id="loading-post"></div>
                <hr>
                <div id="postBar"></div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bgGeneral">
                        Partner</div>
                    <div class="card-body">
                        <div id="listPartner"></div>
                    </div>
                    <div class="card-footer">
                        <a href="#" onclick="gopartner()" style="text-decoration:none; color:black"
                            class="btn btn-link">view more</a>
                    </div>
                </div><br>
                <div class="card">
                    <div class="card-header bgGeneral">
                        Most Popular Bussines
                    </div>
                    <div class="card-body">
                        <div class="block">
                            <img src="js/img/coffeshop.jpeg" alt="">
                            <h4>Coffe Shop</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 fixed">
                <div class="card f">
                    <div class="card-header bgGeneral">
                        Welcome
                    </div>
                    <img class="card-img-top" src="" onError="this.onerror=null;this.src='/js/img/user.png';"  alt="Profile Photo" id="imgProfile">
                    <div class="card-body">
                        <h6 id="nameBar"></h6>
                        <hr>
                        <p class="text-description" id="desc-bar"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<div class="modal" id="listRequestModal">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header btnBgGeneral">
                <h1 class="modal-title text-description-2">Collabs Request</h1>
                <button type="button" class="close" data-dismiss="modal">×</button>
            </div>
            <div class="modal-body">
                <div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="chatRoomModal">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header btnBgGeneral ">
                <div class="block">
                    <img src="" alt="Photo Profile" onError="this.onerror=null;this.src='/js/img/user.png';" id="chat-title-img">
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

<div class="modal" id="postModal">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header btnBgGeneral">
                <h1 class="modal-title text-description-2">Post Something</h1>
                <button type="button" class="close" data-dismiss="modal">×</button>
            </div>
            <div class="modal-body">
                <input type="hidden" class="form-control" id="idPost">
                <input type="hidden" class="form-control" id="urlPhoto">
                <div class="form-group">
                    <textarea id="postInput" cols="30" rows="7" class="form-control"
                        placeholder="Type your posting here"></textarea>
                </div>
                <div class="multiple-upload">
                    <form id="multipleUploadForm" name="multipleUploadForm">
                        <div class="custom-file" id="customFile" lang="es">
                            <input type="file" class="custom-file-input" id="multipleFileUploadInput"
                                aria-describedby="fileHelp">
                            <label class="custom-file-label" for="singleFileUploadInput">
                                Select file...
                            </label>
                        </div>
                    </form>
                    <div class="upload-response">
                        <div id="multipleFileUploadError"></div>
                        <div id="multipleFileUploadSuccess"></div>
                    </div>
                </div>

                <button class="btn btnBgGeneral" id="btnPost" data-dismiss="modal">Post</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="interestModal">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header btnBgGeneral">
                <h1 class="modal-title text-description-2">Interest Your Business</h1>
                <button type="button" class="close" data-dismiss="modal">×</button>
            </div>
            <div class="modal-body">
                <div id="interestBusiness"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<script src="js/global.js"></script>
<script src="js/lib/date_fns.min.js"></script>
<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/popper.min.js"></script>
<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/sockjs.min.js"></script>
<script src="js/lib/stomp.min.js"></script>



<script src="js/user/user.js"></script>
<script src="js/notification/notification.js"></script>
<script src="js/request/request.js"></script>
<script src="js/navbar.js"></script>

<script src="js/toastr.min.js"></script>
<script src="js/core.js"></script>
<script src="js/post/post.js"></script>
<script src="js/photo_profile/photoProfile.js"></script>
<script src="js/post/post-ui.js"></script>
<script src="js/chat/chat.js"></script>
<script src="js/comment/comment.js"></script>
<script src="js/notification/notification-ui.js"></script>




<script src="js/home.js"></script>



</html>

<style>
body {
    background-color: #f0f0f0;
    font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
}
</style>

<script>
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
</script>