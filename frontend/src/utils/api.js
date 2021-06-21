class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }


    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData);
    }

    setUserInfo(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResData);
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData);
    }

    addCard(newCard, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
            .then(this._getResData);
    }

    deleteCard(id, token) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData);
    }

    changeLikeCardStatus(id, isLiked, token) {
        if (isLiked) {
            return this.dislikeCard(id, token);
        } else {
            return this.likeCard(id, token);
        }
    }

    likeCard(id, token) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData);
    }

    dislikeCard(id, token) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData);
    }

    setAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ avatar: data.avatar }),
        })
            .then(this._getResData);

    }

    getAppData(token) {
        return Promise.all([this.getInitialCards(token), this.getUserInfo(token)]);
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
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


export default api
