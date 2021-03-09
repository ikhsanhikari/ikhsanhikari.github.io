class PartnerUi {
    constructor(list) {
        this.list = list;
    }

    render(data, profile) {
        var profileUrl = ''
        if (profile == null) {
            profileUrl = 'js/img/user.png'
        } else {
            profileUrl = profile.url
        }
        const html = `<div class="block">
        <button class="editItemButton btn btn-default" 
        onclick="chatRoom(this,'` + data.firstName + `','` + data.photoProfile + `')" 
        name="` + data.id + `" data-toggle="modal" 
        data-target="#chatRoomModal"> <span class="fas fa-comments"></span></button>
                        <img src="${profileUrl}" alt="${data.firstName}" >
                        <h4>${data.firstName}</small></h4>
                        <p>${data.description}</p>
                    </div>`
        this.list.innerHTML += html;
    }
}