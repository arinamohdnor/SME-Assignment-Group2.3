import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service'

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthService]},
  { path: 'imageuploader', loadChildren: './imageuploader/imageuploader.module#ImageuploaderPageModule' },
  {
    path: 'editoffer',
    loadChildren: () => import('./editoffer/editoffer.module').then( m => m.EditofferPageModule)
  },
  {
    path: 'resetpw',
    loadChildren: () => import('./resetpw/resetpw.module').then( m => m.ResetpwPageModule)
  },
  {
    path: 'myrequest',
    loadChildren: () => import('./myrequest/myrequest.module').then( m => m.MyrequestPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'requestlist',
    loadChildren: () => import('./requestlist/requestlist.module').then( m => m.RequestlistPageModule)
  },

  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
