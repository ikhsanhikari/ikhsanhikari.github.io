
var key = findGetParameter('key')
userObj.searchUser(key)
    .then((data) => data.json())
    .then((data) => {
        var listUser = data.data;
        document.querySelector('#list-search').innerHTML = ``
        listUser.forEach((item) => {
            var profileUrl = ''
            if (item.photoProfile == null) {
                profileUrl = 'js/img/user.png'
            } else {
                profileUrl = item.photoProfile
            }
            const html = `<div class="block">
                            <img src="${profileUrl}" alt="${item.firstName}" >
                            <a href="`+baseURLWEB+`?username=${item.username}" style="text-decoration:none; color:black"><h4>${item.firstName} ${item.lastName}</small></h4></a>
                            <p>${item.description}</p>
                        </div>`
            document.querySelector('#list-search').innerHTML += html
        })
    })