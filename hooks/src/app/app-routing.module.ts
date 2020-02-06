import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'users/edit/:id',
    component: UserEditorComponent,
    canActivate: [AuthGuardService],
    data: {
      editable: true
    }
  },
  {
    path: 'users/create',
    component: UserEditorComponent,
    canActivate: [AuthGuardService],
    data: {
      create: true
    }
  },
  {
    path: 'settings',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./settings/settings.module').then(
      m => m.SettingsModule
    )
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
