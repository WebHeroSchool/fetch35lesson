let preloader = document.getElementById('preloader');

window.setTimeout(function () {
    let body = document.body;
    let url = 'https://api.github.com/users/EkaterinaMatveeva';
    let date = new Date();
    let getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject("Error date!"), 100)
    });
    let getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject("Error URL!"), 100)
    });

    Promise.all([getUrl, getDate])
        .then(([url, date]) => fetch(url))
        .then(res => res.json())
        .then(json => {
            let avatar = new Image();
            avatar.src = json.avatar_url;
            body.append(avatar);
            avatar.classList.add('block');

            let br = document.createElement('br');
            body.append(br);
            br.classList.add('block');

            let name = document.createElement('a');
            if (json.name != null) {
                name.innerHTML = json.name;
            } else {
                name.innerHTML = 'Пользователь не найден';
            }
            body.append(name);
            name.href = json.html_url;
            name.title = json.login;
            name.innerText = json.login;
            name.classList.add('block');

            let bio = document.createElement('h4');
            if (json.bio != null) {
                bio.innerHTML = json.bio;
            } else {
                bio.innerHTML = 'Пользователь не найден';
            }
            body.append(bio);
            bio.classList.add('block');

            body.append(date);

        })
        .catch(err => alert('Пользователь не найден'));
}, 3000);
