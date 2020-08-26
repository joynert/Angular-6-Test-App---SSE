import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { responsiveService } from '../../shared/services/responsive.service';
import { MainService } from '../../shared/services/main.service';
import { UserService } from '../../shared/services/user.service';
import { BreadCrumbsService } from '../../shared/services/breadcrumbs.service';
import { interval } from 'rxjs';
declare var $: any;
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isMobile: any;
    loginPage: boolean = false;
    user: any;
    menuPrincipal: any = [];
    menu: any = [];
    @Output() cambioModuloPrincipal = new EventEmitter<any>();
    absoluteMobile: any;
    isCollapsed: any;


    constructor(
        private responsiveService: responsiveService,
        private router: Router,
        private userService: UserService,
        private mainService: MainService,
        private breadCrumbsService: BreadCrumbsService,
        private location: Location,
    ) {

    }

    ngOnInit() {
      

        this.loginPage = (this.location.path() == "/" || this.location.path() == "/login" ||  this.location.path() == "/transaction-app/#/login") ? true : false;

        if (!this.loginPage) {

            this.isCollapsed = localStorage.getItem("isCollapsed");
            $("body").attr("id", "page-top");
            this.user = this.userService.getUserLoggedIn();            
            this.onResize();
        }
    }

    onResize() {
        this.isMobile = this.responsiveService.checkWidth();
        var width = window.innerWidth;

        if (width <= 767) {
            this.absoluteMobile = true;
        } else {
            this.absoluteMobile = false;
        }


    }

    hideBar() {
        $("body").toggleClass("sidebar-toggled");
        $("#accordionSidebar").toggleClass("toggled");
        if ($("#accordionSidebar").hasClass("toggled")) {
            (<any>$('#accordionSidebar .collapse')).collapse('hide');
        }
   }

    goTo(url) {
        this.router.navigate(['/' + url]);
    }

    clearCurrentModule() {
        this.breadCrumbsService.homeBreadCrumbs();
        this.cambioModuloPrincipal.emit({ nb: '' });
        this.menu = [];
    }

    cleanBreadCrumb() {
        this.breadCrumbsService.homeBreadCrumbs();
    }

    cleanMenu() {
        localStorage.removeItem('currentModuloMenu');
    }

    aceptar(){
       this.location.replaceState("/login");
       window.location.reload();
    }
}
