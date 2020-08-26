import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

    constructor() { 
        //this.db.createStore(1, this.createCollections);
    }

    createCollections(db) {
        db.currentTarget.result.createObjectStore('globalsStorage');
        db.currentTarget.result.createObjectStore('globalsStorageDb');
    }

    setGlobals(configmisc) {
        localStorage.setItem('globalsStorage', JSON.stringify(configmisc));
    }

    setGlobalsDb(dbscheme) {
        localStorage.setItem('globalsStorageDb', dbscheme);
    }

    getGlobals() {
        if (localStorage.getItem('globalsStorage')) {
            return JSON.parse(localStorage.getItem('globalsStorage'));
        } else {
            return false;
        }
    }

    getGlobalsDb() {
        if (localStorage.getItem('globalsStorageDb')) {
            return localStorage.getItem('globalsStorageDb');
        } else {
            return false;
        }
    }

    deleteGlobals() {
        localStorage.removeItem('globalsStorage');
    }

    deleteGlobalsDb() {
        localStorage.removeItem('globalsStorageDb');
    }

    clearLocalStorage() {
        localStorage.clear();
    }

}
