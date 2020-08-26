import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbsService } from '../../shared/services/breadcrumbs.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {
    isMobile: any;
    loginPage: any;
    arregloBreadcrumb = [];
    arregloOutlets = ["primary", "fuenteDatosOutlet"];
    currentUrl: any;
    baseurl: string;

    @Input() breadCrumbs;

    constructor(
        private router: Router,
        private breadCrumbsService: BreadCrumbsService,
        private location: Location,
        private Activatedroute: ActivatedRoute
    ) {

    }

    ngOnInit() {

      this.breadcrumbUrl();

        this.loginPage = (this.location.path() == "/" || this.location.path() == "/login" ||  this.location.path() == "/transaction-app/#/login") ? true : false;
        
        if (!this.loginPage) {
            this.router.events
                .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
                .subscribe(event => {
                    if (
                        event.id === 1 &&
                        event.url === event.urlAfterRedirects
                    ) {
                        this.breadCrumbsService.homeBreadCrumbs();
                    }
                });

            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .pipe(map(() => this.Activatedroute))
                .pipe(map((route) => {
                    while (route.firstChild) { route = route.firstChild; }
                    return route;
                }))
                .pipe(filter(route => this.arregloOutlets.includes(route.outlet)))
                .subscribe(route => {

                    let snapshot = this.router.routerState.snapshot;
                    let url = snapshot.url;
                    let routeData = route.snapshot.data;
                    let label = routeData['breadcrumb'];
                    let params = snapshot.root.params;

                    var array = {
                        url: url,
                        label: label,
                        params: params
                    };

                    this.breadCrumbsService.setBreadCrumbs(array);
                    this.arregloBreadcrumb = this.breadCrumbsService.getBreadCrumbs();
                    this.currentUrl = url;

                });

        }

    }


    breadcrumbUrl(){
      
        if(window.location.hostname != 'localhost'){
            this.baseurl = '/transaction-app/#';
        } else { this.baseurl = '/#';}  
        
        // console.log("baseurl",this.baseurl );
    }

    navigateBreadcrumb(index, url?) {
        if (!this.loginPage) {
            this.breadCrumbsService.cropBreadcrumb(index);
            //console.log(url);
            // this.router.navigate([url], {relativeTo: this.Activatedroute});
        }

    }


   

}
