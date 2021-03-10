let preloader = document.getElementById('lds-grid');
setTimeout(function() {
	preloader.classList.add('hidden');
}, 3000);

window.setTimeout(function () {
    let body = document.body;

		let url = window.location.toString();
    let arr = url.split('=');
    let userName = arr[1];
      if (userName == undefined) {
	      userName = 'EkaterinaMatveeva';
      }
    let github = `https://api.github.com/users/${userName}`;
    let date = new Date();
    let getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject("Error date!"), 1500)
    });
    let getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject("Error URL!"), 1500)
    });

    Promise.all([getUrl, getDate])
        .then(([url, date]) => fetch(github))
        .then(res => res.json())
        .then(json => {
            let avatar = new Image();
            avatar.src = json.avatar_url;
            body.append(avatar);
            avatar.classList.add('block', 'img');

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
            name.classList.add('block', 'name');

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
