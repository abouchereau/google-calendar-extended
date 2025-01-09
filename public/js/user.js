class User {
    #username;
    #write = false;

    get username() {
        if (this.#username == null) {
            this.#username = localStorage.getItem('username'); 
        }
        return this.#username;
    }

    get write() {
        if (this.#write == null) {
            this.#write = localStorage.getItem('write') == "1"; 
        }
        return this.#write;
    }

    register(data) {
        Object.entries(data).forEach(a=>localStorage.setItem(a[0], a[1]));
    }

    unregister() {
        ["token","username","write"].forEach(a=>localStorage.removeItem(a));
        this.#username = null;
        this.#write = false;
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
      
        // Décoder le token pour vérifier son expiration (optionnel)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = Date.now() / 1000 > payload.exp;
      
        return !isExpired;
    }

    getToken() {
      return localStorage.getItem('token');
    }
}