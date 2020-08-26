import { Component, OnInit, Input, SimpleChanges, SimpleChange, ViewChild, HostListener } from '@angular/core';
import { responsiveService } from '../../shared/services/responsive.service';
import { UserService } from '../../shared/services/user.service';
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isMobile: any;
    user: any;
    loginPage: boolean = false;
    nombreModulo: any;
    arrayLangs = ['es', 'en'];
    activeLang = (localStorage.getItem("lang")) ? localStorage.getItem("lang") : navigator.language;
    updateUsuario = false;
    Usuario: any;

    @Input() newNombreModulo;


    constructor(
        private responsiveService: responsiveService,
        private router: Router,
        private userService: UserService,
        private mainService: MainService,
        private location: Location
    ) {
        this.loginPage = (this.location.path() == "/" || this.location.path() == "/login" || this.location.path() == "/transaction-app/#/login") ? true : false;
    }

    ngOnInit() {

        this.nombreModulo = 'Test';

        this.validarLogin();

    }

    validarLogin() {

        if (!this.loginPage) {

            this.user = this.userService.getUserLoggedIn();

            if (!this.user) {

                this.location.replaceState("/login");
                window.location.reload();

            }

            this.onResize();
        }
    }


    onResize() {
        this.isMobile = this.responsiveService.checkWidth();
    }

    hideBar() {
        $("body").toggleClass("sidebar-toggled");
        $("#accordionSidebar").toggleClass("toggled");
    }

    doLogOut() {
        this.userService.destroyUserSession();
        this.validarLogin();
    }

    usuarioUpdate() {
        var co = this.user.co;
        this.router.navigateByUrl(`/usuario-update/${co}`);
        // console.log('ejecutando');
    }

}
