import { Injectable } from "@angular/core";

@Injectable()
export class BreadCrumbsService {

    current: string[] = [];
    homeCrumb = { url: "/home", label: "Inicio", params: {} };

    constructor(

    ) {
        //this.resetBreadCrumbs();
    }

    setBreadCrumbs(value) {
        this.current = JSON.parse(localStorage.getItem('BreadCrumbs'));

        if (this.current) {

            var check = this.checkInArray(this.current, value);

            if (!check) {
                this.current.push(value);
                localStorage.setItem('BreadCrumbs', JSON.stringify(this.current));
            }

        } else {
            var array = [];
            array.push(value);
            localStorage.setItem('BreadCrumbs', JSON.stringify(array));
        }

    }

    getBreadCrumbs() {
        return JSON.parse(localStorage.getItem('BreadCrumbs'));
    }

    resetBreadCrumbs() {
        localStorage.removeItem('BreadCrumbs');
    }

    homeBreadCrumbs() {
        var array = [];
        array.push(this.homeCrumb);
        localStorage.setItem('BreadCrumbs', JSON.stringify(array));
    }

    checkInArray(breads, obj){
        for(let i of breads){
            //if( (i.url == obj.url) && (i.label == obj.label) ){
            if( (i.label == obj.label) ){
                return true;
            }
        }

        return false;
    }

    cropBreadcrumb(index){
        this.current = JSON.parse(localStorage.getItem('BreadCrumbs'));
        var newBread = this.current.slice(0, index + 1);
        localStorage.setItem('BreadCrumbs', JSON.stringify(newBread));
        
    }

}
