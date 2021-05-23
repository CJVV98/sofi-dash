import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './Pages/add-event/add-event.component';
import { AddFileComponent } from './Pages/add-file/add-file.component';
import { AddUserComponent } from './Pages/add-user/add-user.component';
import{ AddNotificationComponent} from "./Pages/add-notification/add-notification.component";
import{ ListNotificationComponent} from "./Pages/list-notification/list-notification.component";
import { ArticleComponent } from './Pages/article/article.component';
import { ListArticlesComponent } from './Pages/list-articles/list-articles.component';
import { ListEventComponent } from './Pages/list-event/list-event.component';
import { ListPermissionsComponent } from './Pages/list-permissions/list-permissions.component';
import { ListRolesComponent } from './Pages/list-roles/list-roles.component';
import { ListUserComponent } from './Pages/list-user/list-user.component';
import { LoginComponent } from './Pages/login/login.component';
import { MoreUserComponent } from './Pages/more-user/more-user.component';
import { TemplateComponent } from './Pages/template/template.component';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usr', component: TemplateComponent, children : [
    { path: 'home', component: HomeComponent },
    { path: 'usuario', component: ListUserComponent },
    { path: 'registeru', component: AddUserComponent },
    //{ path: 'editar', component: EditarconsultaComponent },
    { path: 'roles', component: ListRolesComponent },
    { path: 'permisos', component: ListPermissionsComponent },
    { path: 'archivo', component: AddFileComponent },
    { path: 'articulo', component: ArticleComponent },
    { path: 'articulos', component: ListArticlesComponent },
    { path: 'mas-user', component: MoreUserComponent },
    { path: 'eventos', component: ListEventComponent },
    { path: 'evento', component: AddEventComponent },
    {path: 'notificacion', component: AddNotificationComponent},
    {path: 'notificaciones', component: ListNotificationComponent},

  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
