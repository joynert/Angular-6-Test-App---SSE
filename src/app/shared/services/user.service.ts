import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

    private isUserLoggedIn;
    public usserLogged: User;
    private usuario = new BehaviorSubject([]);
    UsuarioActual = this.usuario.asObservable();

    constructor() {
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn(user: User) {
        this.isUserLoggedIn = true;
        this.usserLogged = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }

    getUserLoggedIn() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }

    setUserFav(movie) {
        
        var favs = JSON.parse(localStorage.getItem("favoritos"));

        if (favs) {
            if (!favs.includes(movie)) {
                favs.push(movie);
                localStorage.setItem('favoritos', JSON.stringify(favs));
            }
        } else {
            var array = [];
            array.push(movie);
            localStorage.setItem('favoritos', JSON.stringify(array));
        }

    }

    getUserFav() {
        return JSON.parse(localStorage.getItem('favoritos'));
    }

    deletetUserFav(movie) {
        var favs = JSON.parse(localStorage.getItem("favoritos"));
        favs = favs.filter(item => item !== movie);
        localStorage.setItem('favoritos', JSON.stringify(favs));
    }

    destroyUserSession() {

        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        localStorage.clear();
    }

    ActualizarUsuario(value) {
        this.usuario.next(value);
    }


}
