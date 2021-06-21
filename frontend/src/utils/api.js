class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }


    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._getResData);
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResData);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._getResData);
    }

    addCard(newCard) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
            .then(this._getResData);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
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
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._getResData);
    }

    dislikeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._getResData);
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ avatar: data.avatar }),
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
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


export default api


// class Api {
//     constructor({ baseUrl, headers }) {
//         this._baseUrl = baseUrl;
//         this._headers = headers;
//     }


//     getUserInfo(localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/users/me`, {
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//         })
//             .then(this._getResData);
//     }

//     setUserInfo(data, localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/users/me`, {
//             method: 'PATCH',
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//             body: JSON.stringify({
//                 name: data.name,
//                 about: data.about
//             })
//         })
//             .then(this._getResData);
//     }

//     getInitialCards(localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/cards`, {
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//         })
//             .then(this._getResData);
//     }

//     addCard(newCard, localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/cards`, {
//             method: 'POST',
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//             },
//             body: JSON.stringify({
//                 name: newCard.name,
//                 link: newCard.link,
//             })
//         })
//             .then(this._getResData);
//     }

//     deleteCard(id, localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/cards/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//         })
//             .then(this._getResData);
//     }

//     changeLikeCardStatus(id, isLiked, localStorage.getItem('jwt')) {
//         if (isLiked) {
//             return this.dislikeCard(id, localStorage.getItem('jwt'));
//         } else {
//             return this.likeCard(id, localStorage.getItem('jwt'));
//         }
//     }

//     likeCard(id, localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//             method: 'PUT',
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//         })
//             .then(this._getResData);
//     }

//     dislikeCard(id, localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//         })
//             .then(this._getResData);
//     }

//     setAvatar(data, localStorage.getItem('jwt')) {
//         return fetch(`${this._baseUrl}/users/me/avatar`, {
//             method: 'PATCH',
//             headers: {
//                 ...this._headers,
//                 Authorization: `Bearer ${localStorage.getItem('jwt')}`
//             },
//             body: JSON.stringify({ avatar: data.avatar }),
//         })
//             .then(this._getResData);

//     }

//     getAppData(localStorage.getItem('jwt')) {
//         return Promise.all([this.getInitialCards(localStorage.getItem('jwt')), this.getUserInfo(localStorage.getItem('jwt'))]);
//     }

//     _getResData(res) {
//         if (res.ok) {
//             return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//     }

// }

// const api = new Api({
//     baseUrl: 'https://api.zb.students.nomoredomains.club',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });


// export default api
