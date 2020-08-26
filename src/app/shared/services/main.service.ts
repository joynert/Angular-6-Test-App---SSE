import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Globals } from '../../app.globals';
declare var $: any;

@Injectable()
export class MainService {

    ApiUrl: string;
    ApiKey: string;

    constructor(
        private http: HttpClient,
    ) {
        this.ApiUrl = Globals.API_BASE_URL;
        this.ApiKey = Globals.API_KEY;
    }

    get_movie_list_filtered(year, filter): Observable<any> {
        const url = this.ApiUrl;
        const params = new HttpParams()
            .set('y', year)
            .set('s', filter)
            .set('apikey', this.ApiKey);
        const req = this.http.get(url, {params});
        return req;
        
    }

    get_movie_detail(id): Observable<any> {
        const url = this.ApiUrl;
        const params = new HttpParams()
            .set('i', id)
            .set('apikey', this.ApiKey);
        const req = this.http.get(url, {params});
        return req;
        
    }

    set_movie_fav(id){
        const url = "http://localhost/favoritos.php";
        const body = { 'movieID': id };
        const req = this.http.post(url, body);
        return req;
    }
  
}