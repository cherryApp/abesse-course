import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { ConfigService } from './service/config.service';
import { LazyLoadPipe } from './pipe/lazy-load.pipe';
import { PaginatorComponent } from './common/paginator/paginator.component';

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
    ForbiddenComponent,
    LazyLoadPipe,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.init(),
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
