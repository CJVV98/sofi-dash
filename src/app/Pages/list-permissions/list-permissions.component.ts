import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Permission } from 'src/app/model/Permission';
import { PermissionsService } from 'src/app/services/permissions.service';
import { AddPermissionComponent } from '../add-permission/add-permission.component';

@Component({
  selector: 'app-list-permissions',
  templateUrl: './list-permissions.component.html',
  styleUrls: ['./list-permissions.component.css']
})
export class ListPermissionsComponent implements OnInit {
  public permissions!: Array<Permissions>;
  dataSource=  new MatTableDataSource<Permissions>();
  displayedColums: string[] = ['id', 'name','description', 'actions'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(private service:PermissionsService, private router:Router,  public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showPermmision();
    }, 50);   
  }
  showPermmision(){
    this.service.consult().subscribe((result: { data: Permissions[]; })=>{
      if(!result){
        return;
      }
      this.permissions=result.data;
      this.dataSource = new MatTableDataSource(this.permissions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  operation(edit?:boolean,permission?:Permission){
    let dialogP=this.dialog.open(AddPermissionComponent, {
      data:{"permission":permission, "edit":edit}
    });
    dialogP.afterClosed().subscribe(()=>{
      setTimeout(()=>{
        this.showPermmision();
      },50)
    })
  }

  delete(id:number){
    this.service.delete(id).subscribe(()=>{
      this.showMessage("Proceso exitoso", "Eliminar permiso");
      this.showPermmision();
    })
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

}



