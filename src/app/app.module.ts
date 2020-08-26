// Core de Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

//Servicios
import { AuthGuard } from './shared/services/auth-guard.service';
import { responsiveService } from './shared/services/responsive.service';
import { UserService } from './shared/services/user.service';
import { GlobalsService } from './shared/services/globals.service';
import { BreadCrumbsService } from './shared/services/breadcrumbs.service';
import { MainService } from './shared/services/main.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { BreadcrumbsComponent } from './template/breadcrumbs/breadcrumbs.component';
import { AlertModule } from './template/alert';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './body/test/test.component';
import { FavoritoComponent } from './body/favorito/favorito.component';
import { SseService } from './shared/services/sse.service';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';

//Rutas
const appRoutes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'home', component: TestComponent, data: { breadcrumb: "Inicio" }, canActivate: [AuthGuard] },
	{ path: 'favoritos', component: FavoritoComponent, data: { breadcrumb: "Favoritos" }, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'doLogin', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'addFav',  redirectTo: 'home', pathMatch: 'full' },
]
@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		SidebarComponent,
		FooterComponent,
		BreadcrumbsComponent,
		TestComponent,
		LoginComponent,
		FavoritoComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes, { useHash: true }),
		HttpClientModule,
		AlertModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [
		AuthGuard,
		responsiveService,
		UserService,
		GlobalsService,
		BreadCrumbsService,
		MainService,
		SseService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
