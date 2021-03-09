class NotificationUi{
    constructor(list){
        this.list = list;
    }

    render(data){
        if(data.isRead == false){
            const html = `<div class="list-group list-group-flush">
                            <a href="#" onclick="read(${data.id})">
                            <div class="list-group-item">
                                ${data.message}
                            </div>
                            </a>
                        </div>`
            this.list.innerHTML += html;
        }else{
            const html = `<div class="list-group list-group-flush">
                            <div class="list-group-item">
                                ${data.message} <br>
                            </div>
                        </div>`
            this.list.innerHTML += html;
        }
        
    }

    renderNotif(data){
        const html = `<div class="list-group list-group-flush">
                            <div class="list-group-item">
                                ${data.message}
                            </div>
                        </div>`
        this.list.setAttribute('data-content',html);
    }

    renderSignUpNotif(data){
        const html = `<div class="list-group list-group-flush">
                            <a href="`+baseURLWEB+`?username=`+data.username+`" style="text-decoration: none; color:black">
                            <div class="list-group-item">
                                ${data.message}
                            </div>
                            </a>
                        </div>`
        this.list.innerHTML += html;
    }
}