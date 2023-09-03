export default class Api {
  constructor(options) {
    const { baseUrl, token = null } = options

    this._baseUrl = baseUrl.replace(/\/+$/, '')
    this._token = token;
  }

  _makeRequest(url, options) {
    options = options || {}
    const { method = "GET", body, headers = {} } = options
    let jsonBody = null;

    if (body) {
      jsonBody = JSON.stringify(body)
    }

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`
    }

    const relativeUrl = url.replace(/^\/+/, '')
    return fetch(`${this._baseUrl}/${relativeUrl}`, {
      method: method,
      body: jsonBody,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({"response": res})
        }

        return res.json()
      });
  }

  signup(email, password) {
    return this._makeRequest("/signup", {
      method: "POST",
      body: {
        password: password,
        email: email
      }
    })
  }

  signin(email, password) {
    return this._makeRequest("/signin", {
      method: "POST",
      body: {
        password: password,
        email: email
      }
    })
  }

  getCurrentUser() {
    return this._makeRequest("/users/me", { method: "GET" })
  }

  getInitialCards() {
    return this._makeRequest("/cards")
  }

  changeUserProfile(name, about) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: {
        name: name,
        about: about
      }
    })
  }

  addCard(name, link) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: {
        name: name,
        link: link
      }
    })
  }

  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, { method: "DELETE" });
  }

  addCardLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, { method: "PUT" });
  }

  deleteCardLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, { method: "DELETE" });
  }

  changeAvatar(avatar) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: {
        avatar: avatar
      }
    })
  }
}