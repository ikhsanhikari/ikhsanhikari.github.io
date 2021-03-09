class PostUi {
    constructor(list) {
        this.list = list;
        this.commentContent = '';
    }

    render(data) {
        var listPost = data.data;
        postBar.innerHTML = '';
        listPost.forEach((item) => {
            this.commentContent = ``;
            item.firstComments.forEach((item) => {
                var urlPhotoComment = ``
                if (item.userComments.photoProfile == null ) {
                    urlPhotoComment = `js/img/user.png`;
                } else {
                    urlPhotoComment = item.userComments.photoProfile;
                }
                this.commentContent += `<div class="card">
                        <div class="card-body text-description block-comment">
                            <img src="`+ urlPhotoComment + `" onError="this.onerror=null;this.src='/js/img/user.png';" alt="">
                            <h4><a href="`+ baseURLWEB + `?username=` + item.userComments.username + `" style="color:black">` + item.userComments.firstName + `</a> 
                             <span class="text-description" >`+ dateFns.distanceInWords(new Date(item.createdAt), new Date()) + `</span>
                            <br><br><br><p >`+ item.firstComment + `
                    </p></h4> </div>
                    
                    </div>
                    `
            })

            var urlPhoto = ``
            if (item.users.photoProfile == null) {
                urlPhoto = `js/img/user.png`;
            } else {
                urlPhoto = item.users.photoProfile;
            }

            postPhoto = ``;
            if(item.urlPhoto!=null && item.urlPhoto!=''){
                postPhoto = `<img class="card-img-top" onError="this.onerror=null;this.src='/js/img/default_post_photo.png';" src="`+item.urlPhoto+`" alt="Post Photo" >`;
            }
            var btnUpdatePost = ``
            if(localStorage.getItem('uid')==item.users.id){
                btnUpdatePost = `<button class=" editItemButton btn btn-default" data-toggle="modal"
                    data-target="#postModal" onclick="getPost('`+item.id+`')"> 
                    <span class="fas fa-pen"></span>
                </button>`
            }
            var interestBtn = ''
            var interestID = ''
            var interestAmount = item.interest.length;
            var statusInterest = false;
            item.interest.forEach((itemInterest)=>{
                if(itemInterest.userId == userId){
                    statusInterest = true;
                }
                interestID +=  itemInterest.userId+' '; 
            })
            if(statusInterest == true){
                interestBtn = '<span class="fas fa-thumbs-up"></span> interested'
            }else{
                interestBtn = 'interest'
            }
            this.list.innerHTML += `<div class="row">
                <div class="col-md-12">
                    <div class="card">
                        `+btnUpdatePost+`
                        <div class="card-header bgGeneral block">
                        <img src="`+ urlPhoto + `" alt="" onError="this.onerror=null;this.src='/js/img/user.png';" >
                            <h4> <a href="`+ baseURLWEB + `?username=` + item.users.username + `" style="color:black"> ` + item.users.firstName + ` ` + item.users.lastName + ` </a> <br> <span class="text-description">` + dateFns.distanceInWords(new Date(item.createdAt), new Date()) + `</span><h4>
                        </div>
                        `+postPhoto+`
                        <div class="card-body">
                            <pre style="font-family: arial">`+ item.post + `</pre>
                            <hr>
                            <a style="cursor: pointer; font-size:12px; font-weight:40px" id="interstBtn"  onclick="interst(this,'`+item.id+`')">`+interestBtn+`</a> | 
                            <a style="cursor: pointer; font-size:12px; font-weight:40px"  data-toggle="collapse" data-target="#footer`+item.id+`"><span class="fas fa-eye"></span> hide comment row </a>
                            <br>
                            <a style="cursor: pointer; font-size:12px; font-weight:40px" data-toggle="modal" data-target="#interestModal" onclick="showInterest(`+item.id+`)">`+interestAmount+` other interest your business  </a>  
                        </div>
                        <div class="card-footer collapse show" id="footer`+item.id+`">
                            `+ this.commentContent +
                `
                        <div id="loading-comment`+ item.id + `"></div>
                        </div>
                        
                        <textarea placeholder="Type First Comment "  id="comment`+ item.id + `" class="form-control"></textarea>
                            <button class="btn btn-outline-dark" id="`+ item.id + `" onclick="commentPost(this)"  >Comment</button>
                    </div>
                </div>
            </div>
            <hr>`
        })
        document.querySelector("#loading-post").innerHTML = ''
    }

}