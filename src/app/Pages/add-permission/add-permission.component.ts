import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'selenium-webdriver';
import { Permission } from 'src/app/model/Permission';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {
  permission!: Permission;
  edit:boolean=false;
  permissionEdit!: Permission;
  constructor(public service: PermissionsService, public dialog: MatDialog,private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {}
  formPermission!: FormGroup;

  ngOnInit(): void {
    this.edit=this.data.edit;
    if(this.edit)
      this.permissionEdit=this.data.permission;
    this.initForm();
  }

  add(){
    this.permission=new Permission();
    if(this.edit)
      this.permission.id=this.permissionEdit.id;
    else
      this.permission.name=this.formPermission.value['name'];
    this.permission.description=this.formPermission.value['description'];
    let message=this.edit?"Editar":"Insertar";
    this.service.add(this.permission, this.edit).subscribe(data=>{
      this.showMessage("Proceso exitoso", message+" permiso");
    },error=>{
      this.showMessage(error, message+" permiso");
    })
    this.dialog.closeAll();
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });

  }

  initForm() {
    this.formPermission = new FormGroup({
      'name': new FormControl(this.edit?this.permissionEdit.name:''),
      'description': new FormControl(this.edit?this.permissionEdit.description:'')
    });
  }

}
