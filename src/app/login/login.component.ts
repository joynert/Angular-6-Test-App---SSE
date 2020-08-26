import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { LoginService } from '../shared/services/login.service';
import { User } from '../shared/models/user.model';
import { Globals } from '../app.globals';
import { GlobalsService } from '../shared/services/globals.service';
import { Location } from '@angular/common';

import * as $ from 'jquery';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

    flagLogin: any;
    mensaje: any;
    disabledBtn: any;
    token: any;
    flagToken: boolean = false;
    flagGlobals: any;
    conexionesDb: any;
    globalData: any;
    globalInfo: any;
    selectItems = {};
    objectGlobal: { [k: string]: any } = {};
    currentDb: string;
    successUrl = window.location.origin + window.location.pathname + '#/home';
    alertActive: any;
    alertType: any;
    alertMsg: any;
    leng = null;

    constructor(
        private router: Router,
        private Activatedroute: ActivatedRoute,
        private userService: UserService,
        private LoginService: LoginService,
        private GlobalsService: GlobalsService,
        private location: Location,
    ) {
        this.mensaje = '';
        this.flagLogin = -1;
    }

    ngOnInit() {

        this.leng = localStorage.getItem('lang');
        $("#content-wrapper").addClass('bg-gradient-primary');
        this.token = this.Activatedroute.snapshot.paramMap.get('token');
        this.disabledBtn = false;
        this.flagToken = false;
        this.objectGlobal = Globals;
        if (this.userService.getUserLoggedIn()) {
            this.location.replaceState("/home");
            window.location.reload();
        } else {
            this.userService.destroyUserSession();
            this.router.navigate(['login']);
        }

    }

    ngOnDestroy() {
        $("#content-wrapper").removeClass('bg-gradient-primary');
    }

    buildAlert(type, msg) {
        this.alertActive = true;
        this.alertType = type;
        this.alertMsg = msg;
    }

    clearAlert() {
        this.alertActive = false;
        this.alertType = "";
        this.alertMsg = "";
    }

    checkLoginAuth(event) {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        const remember = $("input:checked").length;

        if (this.disabledBtn == false) {
            this.disabledBtn = true;
            this.doLogin(username, password, remember);
            this.disabledBtn = false;

        }

    }

    doLogin(username, password, remember) {
        this.LoginService.doLogin(username, password)
            .subscribe(data => {
                if (data.accessToken) {
                    this.disabledBtn = false;
                    this.buildAlert('success', 'Inicio de Sesion Correcto');
                    this.userService.ActualizarUsuario(data.user);
                    let u: User = {
                        nb: username,
                        token: data.accessToken,
                    };
                    this.userService.setUserLoggedIn(u);
                    this.location.replaceState("/home");
                    window.location.reload();
                }
            }, error => {
                this.disabledBtn = false;
                this.buildAlert('danger', error.error.message);
            });
    }

}