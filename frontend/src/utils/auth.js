class Auth {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        }).then(this._getResData)
    }

    authorize(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        }).then(this._getResData);
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        }).then(this._getResData)
    }

    _getResData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const auth = new Auth({
    baseUrl: 'https://react-mesto-ihrf.onrender.com',
    // baseUrl: 'http://localhost:3000',

    headers: {
        'Content-Type': 'application/json'
    }
})

export default auth;
