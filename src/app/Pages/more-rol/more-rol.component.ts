import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from 'src/app/model/Permission';
import { Role } from 'src/app/model/Role';

@Component({
  selector: 'app-more-rol',
  templateUrl: './more-rol.component.html',
  styleUrls: ['./more-rol.component.css']
})
export class MoreRolComponent implements OnInit {
  role!:Role;
  sizePage = 10;
  listPermission: Permission[] = [];
  optionSize =[5, 10, 25, 100];
  constructor(@Inject(MAT_DIALOG_DATA) private data: Role) { }

  ngOnInit(): void {
    this.role=this.data;
    this.listPermission=this.role.permissions.slice(0,this.sizePage)
  }

  page(pagination: any) {
    let current = pagination.pageIndex * pagination.pageSize;
    this.listPermission = this.role.permissions.slice(
      current,
      current + pagination.pageSize
    );
    }
}
