import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';

declare var $: any;

@Injectable({
	providedIn: 'root'
})

export class LoginService {

	ApiUrl: any;

	constructor(
		private router: Router,
		private http: HttpClient,
	) {
		this.ApiUrl = Globals.API_BASE_URL;
	}

	doLogin(username, password): Observable<any> {
        // const url = this.ApiUrl + '/token';
        const url = "http://localhost:4200/#/doLogin";
        const body = { 'username': username, 'password': password  };
        const req = this.http.post(url, body);
        return req;
    }

}
