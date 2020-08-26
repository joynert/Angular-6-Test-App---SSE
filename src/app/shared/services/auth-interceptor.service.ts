import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

	usersData = {
		"users": [
			{
				"nb": "user",
				"accessToken": "qwertyuiop",
				"pass": "1234"
			}, {
				"nb": "testing",
				"accessToken": "asdfghjkl",
				"pass": "0987"
			},

		]
	}
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (req.method === "POST" && req.url === "http://localhost:4200/#/doLogin") {

			var user = this.usersData.users;
			var index = user.findIndex(obj =>
				obj.nb == req.body.username && obj.pass == req.body.password
			);
			if (index == -1) return error('Username o password incorrecto');
            return ok({
                nb: user[index].nb,
                accessToken: user[index].accessToken
            })

		}else{
			return next.handle(req)

		}

		function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

		function error(message) {
			return throwError({ error: { message } });
		}
	}


}
