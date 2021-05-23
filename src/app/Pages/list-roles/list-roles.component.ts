import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/model/Role';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddRoleComponent } from '../add-role/add-role.component';
import { MoreRolComponent } from '../more-rol/more-rol.component';
@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {
  public roles!: Array<Role>;
  dataSource=  new MatTableDataSource<Role>();
  displayedColums: string[] = ['id', 'name', 'permissions','actions'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  
  constructor(private service:RolesService, private router:Router,  public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.showList();
  }


  showList(){
    this.service.consult().subscribe((result: { data: Role[]; })=>{
      if(!result){
        return;
      }
    ;
      this.roles=result.data;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  moreRole(rol:Role){
    this.dialog.open(MoreRolComponent, {
      width: '50%',
       data:rol,
    });
  }
  operation(edit?:boolean,role?:Role){
    let dialogP=this.dialog.open(AddRoleComponent, {
      data:{"role":role, "edit":edit}
    });
    dialogP.afterClosed().subscribe(()=>{
      setTimeout(()=>{
        this.showList();
      },50)
    })
  }

}


