import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable()
export class responsiveService {
    private isMobile = new Subject();
    public screenWidth: string;

    constructor() {
        this.checkWidth();
    }

    onMobileChange(status: boolean) {
        this.isMobile.next(status);
    }

    getMobileStatus(): Observable<any> {
        return this.isMobile.asObservable();
    }

    public checkWidth() {
        var width = window.innerWidth;
        if (width <= 767) {
            this.screenWidth = 'sm';
            var sizeMobile = true;
            this.onMobileChange(true);
        } else if (width > 767 && width <= 959) {
            this.screenWidth = 'md';
            var sizeMobile = true;
            this.onMobileChange(true);
        } else {
            this.screenWidth = 'lg';
            var sizeMobile = false;
            this.onMobileChange(false);
        }
        return sizeMobile;
    }

}
