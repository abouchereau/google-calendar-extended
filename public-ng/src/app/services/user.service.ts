import { Injectable } from '@angular/core';
import { User } from '../models/entity/user';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = signal<User | null>(null);

  register(user: User): void {
    this.currentUser.set(user);
    this.store();
  }

  store() {
      localStorage.setItem('token', this.currentUser()!.token!);
      localStorage.setItem('username', this.currentUser()!.username!);
      localStorage.setItem('write', this.currentUser()!.write ? "1" : "0");
  }

  unregister() {
        ["token","username","write"].forEach(a=>localStorage.removeItem(a));
        this.currentUser()!.destroy();
        this.currentUser.set(null);
    }


  isAuthenticated(): boolean {
        const token:string|null = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        const payload: { exp: number } = JSON.parse(atob(token.split('.')[1]));
        const isExpired: boolean = Date.now() / 1000 > payload.exp;
      
        return !isExpired;
    }

}