import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/template/alert';
import { MainService } from './../../shared/services/main.service';
import { UserService } from './../../shared/services/user.service';

declare var $: any;


@Component({
	selector: 'app-favorito',
	templateUrl: './favorito.component.html',
	styleUrls: ['./favorito.component.scss']
})
export class FavoritoComponent implements OnInit {

	usuario: any;
	favs: any;
	movies = [];
	movieDet: any;
	loading: boolean;

	constructor(
		private alertService: AlertService,
		private mainService: MainService,
		private userService: UserService,
	) {

	}

	ngOnInit() {
		this.loading = true;
		this.usuario = this.userService.getUserLoggedIn();
		var movies = this.userService.getUserFav();
		console.log(movies);

		for(let i = 0; i < movies.length; i++){
			this.mainService.get_movie_detail(movies[i]).subscribe(data => {
				if (data) {
					this.movies.push(data);
				}
			});
		}

		console.log(this.movies);
		this.loading = false;

	}

    verDetalle(id){

        this.mainService.get_movie_detail(id).subscribe(data => {
            if (data) {
                this.movieDet = data;
            } else {
                this.alertService.error('Sin información');
            }
        }, error =>{
            console.log(error);
            this.alertService.error(error.message);
            $("#detalleModal").modal("hide");

        }, () => {
            $("#detalleModal").modal("show");

        });
    }

	removefromFavs(id){
		this.userService.deletetUserFav(id);
		this.alertService.error("Eliminado de Favoritos");
		var index = this.movies.findIndex(obj =>
			obj.imdbID == id
		);

		if(index){
			this.movies.splice(index, 1);
		}

	}

}
