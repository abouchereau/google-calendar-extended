import { browserStorage } from '../../core/browser-storage';

export class User {

  constructor(private _username: string|null, private _token: string|null, private _write: boolean|null) {}

    get username() {
        if (this._username == null) {
            this._username = browserStorage.getItem('username'); 
        }
        return this._username;
    }

    get write() {
        if (this._write === null) {
            this._write = browserStorage.getItem('write') == "1"; 
        }
        return this._write;
    }

    get token() {
        if (this._token == null) {
            this._token = browserStorage.getItem('token'); 
        }
        return this._token;
    }


    destroy() {
        ["token","username","write"].forEach(a=>browserStorage.removeItem(a));
        this._username = null;
        this._write = null;
        this._token = null;
    }
}
