class Api {
    constructor( {baseUrl, headers} ) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }


    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {
                headers: this._headers
            })
            .then(this._getResData);
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(this._getResData);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
                headers: this._headers,
            })
            .then(this._getResData);
    }

    addCard(newCard) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: newCard.name,
                    link: newCard.link,
                })
            })
            .then(this._getResData);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._getResData);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
          return this.dislikeCard(id);
        } else {
          return this.likeCard(id);
        }
      }

    likeCard(id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._getResData);
    }

    dislikeCard(id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._getResData);
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify( {avatar: data.avatar} ),
        })
        .then(this._getResData);

    }

    getAppData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }

    _getResData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}

const api = new Api({
    baseUrl: 'https://api.zb.students.nomoredomains.club',
    headers: {
      authorization: '9da2e5f7-acdb-422d-9138-e514aeb3e40e',
      'Content-Type': 'application/json'
    }
  });


export default api
