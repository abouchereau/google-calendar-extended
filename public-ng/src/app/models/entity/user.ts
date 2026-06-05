export class User {

  constructor(private _username: string|null, private _token: string|null, private _write: boolean|null) {}

    get username() {
        if (this._username == null) {
            this._username = localStorage.getItem('username'); 
        }
        return this._username;
    }

    get write() {
        if (this._write === null) {
            this._write = localStorage.getItem('write') == "1"; 
        }
        return this._write;
    }

    get token() {
        if (this._token == null) {
            this._token = localStorage.getItem('token'); 
        }
        return this._token;
    }


    destroy() {
        ["token","username","write"].forEach(a=>localStorage.removeItem(a));
        this._username = null;
        this._write = null;
        this._token = null;
    }
}