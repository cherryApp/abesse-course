import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { RangeValidatorDirective } from './common/range-validator.directive';
import { InputDebounceDirective } from './common/input-debounce/input-debounce.directive';
import { ServerValidatorDirective } from './common/server-validator/server-validator.directive';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    NavigationComponent,
    UserEditorComponent,
    RangeValidatorDirective,
    InputDebounceDirective,
    ServerValidatorDirective,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
