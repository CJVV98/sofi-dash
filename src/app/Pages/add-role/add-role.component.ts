import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'selenium-webdriver';
import { Permission } from 'src/app/model/Permission';
import { Role } from 'src/app/model/Role';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  edit: boolean = false;
  role!: Role;
  public permissions!: Array<Permission>;
  public permissionsOrigin!: Array<Permission>;
  public permissionsSelect!: Array<Permission>;
  constructor(private service: PermissionsService, private serviceRol: RolesService,
    public dialog: MatDialog, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }
  formRole!: FormGroup;

  ngOnInit(): void {
    this.edit = this.data.edit;
    this.role = this.data.role;
    this.showPermission();
    this.initForm();
  }

  showPermission() {
    this.service.consult().subscribe((result: { data: Permission[]; }) => {
      if (!result) {
        return;
      };
      this.permissionsOrigin = result.data;
      this.permissions = this.permissionsOrigin;
      if (this.edit) {
        this.permissionsSelect = new Array<Permission>();
        this.comparePermission();
      }
    })
  }
  searchPerm(event: any) {
    setTimeout(() => {
      console.log(event.target.value);
      let keyword = event.target.value;
      this.permissions = this.permissionsOrigin.filter(p => p.description.includes(keyword));
    }, 100)
  }
  add() {
    let roleAdd = new Role();
    if(!this.edit){
      roleAdd.name = this.formRole.value['name'];
    }else{
      roleAdd.id=this.role.id;
    }
    roleAdd.permissions = this.formRole.value['permissionsList'];
    roleAdd.description=this.formRole.value['description'];
    let message=this.edit?"Editar":"Insertar";
    this.serviceRol.save(roleAdd,this.edit).subscribe(data => {
      this.showMessage("Proceso exitoso", message+" rol");
    }, error => {
      this.showMessage(error.name, message+" rol");
    })
    this.dialog.closeAll();

  }
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  initForm() {
    this.formRole = new FormGroup({
      'name': new FormControl(this.edit ? this.role.name : ''),
      'permissionsList': new FormControl(''),
      'description': new FormControl(this.edit ? this.role.description : '')
    });

  }
  comparePermission() {
    this.role.permissions.forEach(permAct => {
      this.permissionsOrigin.forEach(perm => {
        if (permAct.name == perm.name)
          this.permissionsSelect.push(perm);
      })
    });
  }


}
