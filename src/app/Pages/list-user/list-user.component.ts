import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserState } from 'src/app/model/UserState';
import { InfoUserService } from 'src/app/services/infoUser.service';
import { UserService } from 'src/app/services/user.service';
import { AddFileComponent } from '../add-file/add-file.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MoreUserComponent } from '../more-user/more-user.component';
import { TemplateComponent } from '../template/template.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  public users!: Array<User>;
  dataSource=  new MatTableDataSource<User>();
  displayedColums: string[] = ['id', 'name', 'lastname', 'email', 'phone1','actions'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
 
  constructor(private service:UserService, private infoUser:InfoUserService, private router:Router, public dialog: MatDialog,private snackBar: MatSnackBar, private template:TemplateComponent, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.service.uploadPhoto().subscribe();
   TemplateComponent.titlePage="Usuarios";
   setTimeout(()=>{
    this.showUsers();
   },100);
   
  }
  ngOnChanges() {
    this.showUsers();
  }
  showUsers(){
    this.service.consultUsers().subscribe((result: { data: User[]; })=>{
      if(!result){
        return;
      }
    ;
      this.users=result.data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  loadFile(){
    this.dialog.open(AddFileComponent, {
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  add(){  
    let userNew=new User();
    userNew.identification="0";
    this.infoUser.setUser(userNew);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/registeru/`]));   
  }


  edit(user:User){
    this.infoUser.setUser(user);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/registeru/`],))
  }

  moreUser(user:User){
    this.dialog.open(MoreUserComponent, {
      width: '50%',
       data:user,
       panelClass: 'custom-modalbox'
    });
  }

  changeState(event: MatSlideToggleChange, user:User){
    let userS=new UserState();
    userS.state=event.checked?0:1;
    this.service.changeState(user.id,userS).subscribe(()=>{
      this.showUsers();
    })
    console.log('toggle', event.checked);
  }

}


