import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/template/alert';
import { MainService } from './../../shared/services/main.service';
import { UserService } from './../../shared/services/user.service';
import { SseService } from "./../../shared/services/sse.service";

declare var $: any;
@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    usuario: any;
    movies: any;
    movieDet: any;
    loading: boolean;

    constructor(
        private alertService: AlertService,
        private mainService: MainService,
        private userService: UserService,
        private sseService: SseService
    ) {

    }

    ngOnInit() {
        this.loading = false;
        this.usuario = this.userService.getUserLoggedIn();
        this.sseService.getServerSentEvent("http://localhost/favoritos.php").subscribe(data => console.log(data));
    }

    filter() {
        const year = $('#year').val();
        const filt = $('#filtro').val();
        this.mainService.get_movie_list_filtered(year, filt).subscribe(data => {
            if (data) {
                this.movies = data.Search;
            } else {
                this.alertService.error('Sin información');
            }
        }, error => {
            console.log(error);
            this.alertService.error(error.message);
        }, () => {
        });
    }

    verDetalle(id) {

        this.mainService.get_movie_detail(id).subscribe(data => {
            if (data) {
                this.movieDet = data;
            } else {
                this.alertService.error('Sin información');
            }
        }, error => {
            console.log(error);
            this.alertService.error(error.message);
            $("#detalleModal").modal("hide");

        }, () => {
            $("#detalleModal").modal("show");

        });
    }

    addToFavs(id) {

        this.userService.setUserFav(id);
        this.mainService.set_movie_fav(id).subscribe(data => {
            console.log(data)
        });
        this.alertService.success("¡Agregado a Favoritos!");
    }

}