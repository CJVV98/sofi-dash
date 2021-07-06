import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { InfoUserService } from 'src/app/services/infoUser.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  formUser!: FormGroup;
  roles!: Array<Role>;
  edit:boolean=false;
  constructor(private router: Router, private service: UserService, private snackBar: MatSnackBar,
             private dialogo: MatDialog, private serviceRole:RolesService, private infoUser:InfoUserService) { }
  user: User = new User;
  userInfo!: User;
  ngOnInit(): void {
    this.userInfo=this.infoUser.getUser();
    console.log(this.userInfo.id);
    if(this.userInfo.identification=="0")
      this.initForm();
    else{
      this.user.id=this.userInfo.id;
      this.edit=true;
      this.editInfo();
    }  
    this.serviceRole.consult().subscribe((result: { data: Role[]; })=>{
      if(!result){
        return;
      };
    this.roles=result.data;
    })
  }
  public editInfo(){
    this.formUser = new FormGroup({
      'identification': new FormControl(this.userInfo.identification),
      'name': new FormControl(this.userInfo.name),
      'lastname': new FormControl(this.userInfo.lastname),
      'email': new FormControl(this.userInfo.email),
      'address': new FormControl(this.userInfo.address),
      'phone1': new FormControl(this.userInfo.phone1),
      'phone2': new FormControl(this.userInfo.phone2),
      'altername': new FormControl(this.userInfo.alternatename),
      'tittle': new FormControl(this.userInfo.title),
      'institution': new FormControl(this.userInfo.institution),
      'username': new FormControl(this.userInfo.username),
      'password': new FormControl(this.userInfo.password),
      'alternatename': new FormControl(this.userInfo.alternatename),
      'roles':new FormControl('')
    });
  }
  public initForm(): void {
    this.formUser = new FormGroup({
      'identification': new FormControl(''),
      'name': new FormControl(''),
      'lastname': new FormControl(''),
      'email': new FormControl(''),
      'address': new FormControl(''),
      'phone1': new FormControl(''),
      'phone2': new FormControl(''),
      'altername': new FormControl(''),
      'tittle': new FormControl(''),
      'institution': new FormControl(''),
      'username': new FormControl(''),
      'password': new FormControl(''),
      'alternatename': new FormControl(''),
      'roles':new FormControl('')
    });
  }

  public add() {
    
    this.user.identification = this.formUser.value['identification'];
    if(!this.edit){
      this.user.username = this.formUser.value['username'];
      this.user.email = this.formUser.value['email'];
    }
    this.user.name = this.formUser.value['name'];
    this.user.lastname = this.formUser.value['lastname'];
    this.user.title = this.formUser.value['tittle'];
    this.user.institution = this.formUser.value['institution'];
    this.user.phone1 = this.formUser.value['phone1'];
    this.user.phone2 = this.formUser.value['phone2'];
    this.user.address = this.formUser.value['address'];
    this.user.alternatename = this.formUser.value['alternatename'];
    this.user.roles= this.formUser.value['roles'];
    if(!this.edit) this.user.password = this.formUser.value['password'];
    this.service.save(this.user, this.edit).subscribe(data => {    
      let message=this.edit?"editado": "registrado";  
      this.showMessage("Usuario "+message+" exitosamente", "Insertar");
    }, error => {
      this.showMessage("Error durante registro o actualizacion de datos", "Insertar");
    });
    
    this.cancel();
  }

  public cancel() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/usr/usuario`]));
  }


  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

 
}
