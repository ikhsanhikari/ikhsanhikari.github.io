<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Profile</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/toastr.min.css">
    <link rel="shortcut icon" href="js/img/1573277387101.png">
    <script src="js/global.js"></script>
</head>
<script>
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
if (!findGetParameter('username')) {
    window.location = baseURLWEB + 'home.php';
}
</script>

<body>
    <div id="navBar"></div>

    <div class="container" style="margin-top: 100px">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="row" style="background-image: url(js/img/default_cover_photo.png);
                            height:20%;background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;" id="photoSampul">
                            <div class="col-md-6">
                                <img src="" onError="this.onerror=null;this.src='/js/img/user.png';" id="photoProfile" alt="Photo Profile" width="50%" height="162px"
                                    style="border-radius: 100px">
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col-md-6" >
                                <h4 id="nameBar"></h4>
                                <p id="desBar"></p>
                                <p class="text-description-2" id="infoBar"></p>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <div>
                                        <button class="btn btnBgGeneral" id="btnCollabs">Collabs</button>
                                    </div>
                                    <div class="dropdown " id="psection">
                                        <button type="button" class="btn btnBgGeneral text-white dropdown-toggle"
                                            data-toggle="dropdown">
                                            Profile Section
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                                data-target="#achievementModal"
                                                onclick="resetFormAchievement()">Achievement</a>
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                                data-target="#educationModal">Background</a>
                                            <!-- <a class="dropdown-item" href="#">About</a> -->
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                                data-target="#experienceModal"
                                                onclick="resetFormExperience()">Experience</a>
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                                data-target="#myModal">Change
                                                Cover Photo</a>
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                                data-target="#photoProfileModal">Change
                                                Profile Photo</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div id="profileBar">
                    <div class="row" id="experienceRow">
                        <div class="col-md-12">
                            <div class="card">
                                <button class="editButton btn btn-default" data-toggle="modal"
                                    id="btnAddExperience"
                                    data-target="#experienceModal"> <span class="fas fa-plus " 
                                        oncclik="resetFormExperience()"></span></button>
                                <div class="card-header bgGeneral ">
                                    <h5>Experience</h5>
                                </div>
                                <div class="card-body">
                                    <div id="experienceBar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row" id="educationRow">
                        <div class="col-md-12">
                            <div class="card">
                                <button class="editButton btn btn-default" id="btnAddEducation" data-toggle="modal"
                                    data-target="#educationModal" onclick="resetFormEducation()"> <span
                                        class="fas fa-plus "></span></button>
                                <div class="card-header bgGeneral ">
                                    <h5>Background Education </h5>
                                </div>
                                <div class="card-body">
                                    <div id="educationBar">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row" id="achievementRow">
                        <div class="col-md-12">
                            <div class="card" style="overflow: scroll">
                                <button class="editButton btn btn-default" id="btnAddAchievement" data-toggle="modal"
                                    data-target="#achievementModal" onclick="resetFormAchievement()"> <span
                                        class="fas fa-plus"></span></button>
                                <div class="card-header bgGeneral ">
                                    <h5>Achievement </h5>
                                </div>
                                <div class="card-body">
                                    <div id="achievementBar">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <!-- <div class="row" id="aboutRow">
                        <div class="col-md-12">
                            <div class="card">
                                <button class="editButton btn btn-default" id="btnAddAbout" data-toggle="modal"
                                    data-target="#aboutModal"> <span
                                        class="fas fa-plus"></span></button>
                                <div class="card-header">
                                    <h5>About </h5>
                                </div>
                                <div class="card-body">
                                    <p class="text-description" id="aboutBar"></p>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>

            <!-- <div class="col-md-4">
                <div class="card">
                    <div class="card-header bgGeneral ">
                        Partner</div>
                    <div class="card-body">
                        <div class="list-group" id="listPartner"></div>
                    </div>
                    <div class="card-footer">
                        <a href="#" onclick="gopartner()" class="btn btn-link">view more</a>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</body>

</html>


<div class="container">
    <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header btnBgGeneral">
                    <h1 class="modal-title text-description-2">Change Cover</h1>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <form id="singleUploadForm" name="singleUploadForm">
                        <div class="custom-file" id="customFile" lang="es">
                            <input type="file" class="custom-file-input" id="singleFileUploadInput"
                                aria-describedby="fileHelp">
                            <label class="custom-file-label" for="singleFileUploadInput">
                                Select file...
                            </label>
                        </div><br><br>
                        <button class="btn btnBgGeneral" id="btnUploadCover" type="submit">Submit</button>
                    </form>
                    <div class="upload-response text-description">
                        <div id="singleFileUploadError"></div>
                        <div id="singleFileUploadSuccess"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal" id="photoProfileModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header btnBgGeneral">
                    <h1 class="modal-title text-description-2">Update photo profile</h1>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <form id="formPhotoProfile" name="formPhotoProfile">
                        <div class="custom-file" id="customFile" lang="es">
                            <input type="file" class="custom-file-input" id="filePhotoProfile"
                                aria-describedby="fileHelp">
                            <label class="custom-file-label" for="filePhotoProfile">
                                Select file...
                            </label>
                        </div>
                        <br><br>
                        <button class="btn btnBgGeneral " id="btnUploadProfile" type="submit">Submit</button>
                    </form>
                    <div class="upload-response text-description">
                        <div id="fileProfileError"></div>
                        <div id="fileProfileSuccess"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal" id="experienceModal">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Experience</h3>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="id"></label>
                                    <input type="hidden" class="form-control" placeholder="Ex: ID" id="idExperience">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="title"></label>
                                    <input type="text" class="form-control" placeholder="Ex: Programmer" id="title">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="company"></label>
                                    <input type="text" class="form-control" placeholder="Ex: Cv. Padepokan 79"
                                        id="company">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="location"></label>
                                    <input type="text" class="form-control" placeholder="Ex: Bandung" id="location">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnExperience" data-dismiss="modal">Save</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal" id="educationModal">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Education</h3>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="id"></label>
                                    <input type="hidden" class="form-control" placeholder="Ex: ID" id="idEducation">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="school"></label>
                                    <input type="text" class="form-control" placeholder="Ex: Harvard University" id="school">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="degree"></label>
                                    <input type="text" class="form-control" placeholder="Ex: Management Informatict"
                                        id="degree">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="fieldOfStudy"></label>
                                    <input type="text" class="form-control" placeholder="Ex: Algorithm"
                                        id="fieldOfStudy">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnEducation" data-dismiss="modal">Save</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal" id="achievementModal">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Add Achievement</h4>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <!-- <label>ID</label> -->
                                <input type="hidden" class="form-control" id="idAchievement" name="idAchievement">
                            </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" id="courseName" name="courseName" placeholder="Ex : App Business ">
                            </div>
                            <div class="form-group">
                                <label>Assosiated with</label>
                                <input type="text" class="form-control" id="assosiatedWith" name="assosiatedWith" placeholder="Ex : Microsoft ">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="saveAchievement"
                        data-dismiss="modal">Save</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="listRequestModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bgGeneral text-white">
                    <h1 class="modal-title text-description-2">Collabs Request</h1>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <div id="listCollabBar">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="aboutModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bgGeneral text-white">
                    <h1 class="modal-title text-description-2">About</h1>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="contactModal">
        <div class="modal-dialog modal-dialog-scrollable modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Contact Info</h4>
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="contactInfo"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <button class="btn" id="test"> test</button> -->
</div>



<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script> -->


<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/popper.min.js"></script>
<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/sockjs.min.js"></script>
<script src="js/lib/stomp.min.js"></script>

<script src="js/toastr.min.js"></script>

<script src="js/user/user.js"></script>
<script src="js/notification/notification.js"></script>
<script src="js/partner/partner.js"></script>
<script src="js/request/request.js"></script>
<script src="js/navbar.js"></script>

<script src="js/core.js"></script>

<script src="js/profile.js"></script>


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