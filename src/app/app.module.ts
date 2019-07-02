import { PointsService } from './points.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './game.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMatchComponent } from './admin/create-match/create-match.component';
import { UpdateMatchComponent } from './admin/update-match/update-match.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AdminPageComponent,
    LoginComponent,
    GamepageComponent,
    CreateMatchComponent,
    UpdateMatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'game',
        component: GamepageComponent,
        canActivate : [AuthGuard]
      },
      {
        path: 'admin/adminpage',
        component: AdminPageComponent,
        canActivate : [AuthGuard,AdminAuthGuard]
      },
      {
        path: 'admin/matches/create',
        component: CreateMatchComponent,
        canActivate : [AuthGuard,AdminAuthGuard]
      }
    ])
  ],
  providers: [
    AngularFireDatabase,
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    PointsService,
    GameService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
