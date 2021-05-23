import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { ListUserComponent } from '../list-user/list-user.component';

@Component({
  selector: 'app-more-user',
  templateUrl: './more-user.component.html',
  styleUrls: ['./more-user.component.css']
})
export class MoreUserComponent implements OnInit {
   user!:User;
  constructor(private dialogRef: MatDialogRef<ListUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User) { }

  ngOnInit(): void {
    this.user=this.data;
  }

}
