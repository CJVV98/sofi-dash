import { Injectable } from "@angular/core";
import { User } from "../model/User";

@Injectable({
    providedIn: 'root'
  })
export class InfoUserService {
    private user!: User;

    setUser(user:User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}
