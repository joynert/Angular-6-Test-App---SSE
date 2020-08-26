import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular6sass';
    nombreModulo: any;
    loginPage: any;

    constructor() {
    }

    ngOnInit() { }

    setCurrentModulo(event) {
        this.nombreModulo = event;
    }
}
