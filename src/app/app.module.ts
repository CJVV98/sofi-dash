import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Pages/login/login.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './Pages/template/template.component';
import { ListUserComponent } from './Pages/list-user/list-user.component';
import { ListRolesComponent } from './Pages/list-roles/list-roles.component';
import { ListPermissionsComponent } from './Pages/list-permissions/list-permissions.component';
import { AddUserComponent } from './Pages/add-user/add-user.component';
import { AddRoleComponent } from './Pages/add-role/add-role.component';
import { AddPermissionComponent } from './Pages/add-permission/add-permission.component';
import { ArticleComponent } from './Pages/article/article.component';
import { AddFileComponent } from './Pages/add-file/add-file.component';
import { MoreUserComponent } from './Pages/more-user/more-user.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { AddKeywordComponent } from './Pages/add-keyword/add-keyword.component';
import { ListArticlesComponent } from './Pages/list-articles/list-articles.component';
import { ListEventComponent } from './Pages/list-event/list-event.component';
import { AddEventComponent } from './Pages/add-event/add-event.component';
import { ListNotificationComponent } from './Pages/list-notification/list-notification.component';
import { AddNotificationComponent } from './Pages/add-notification/add-notification.component';
import { HomeComponent } from './Pages/home/home.component';
import { InfoUserService } from './services/infoUser.service';
import { MoreEventComponent } from './Pages/more-event/more-event.component';
import { QuillModule } from 'ngx-quill';
import { MoreRolComponent } from './Pages/more-rol/more-rol.component';
import { MoreArticleComponent } from './Pages/more-article/more-article.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { ReportComponent } from './Pages/report/report.component';
import { ChartsModule } from 'ng2-charts';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent,
    ListPermissionsComponent,
    ListUserComponent,
    ListRolesComponent,
    AddUserComponent,
    AddRoleComponent,
    AddPermissionComponent,
    ArticleComponent,
    AddFileComponent,
    MoreUserComponent,
    AddKeywordComponent,
    ListArticlesComponent,
    ListEventComponent,
    AddEventComponent,
    ListNotificationComponent,
    AddNotificationComponent,
    HomeComponent,
    MoreEventComponent,
    MoreRolComponent,
    MoreArticleComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    PerfilComponent,
    ReportComponent, 
  ],
  imports: [
    NgxMatColorPickerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    QuillModule.forRoot(),
    FroalaEditorModule.forRoot(),
     FroalaViewModule.forRoot(),
     ChartsModule
    
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
