import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from 'src/app/model/Events';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { ListEventComponent } from '../list-event/list-event.component';

@Component({
  selector: 'app-more-event',
  templateUrl: './more-event.component.html',
  styleUrls: ['./more-event.component.css']
})
export class MoreEventComponent implements OnInit {
  user!:User;
  event!:Events;
  constructor(private dialogRef: MatDialogRef<ListEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Events, private serviceUser: UserService) { }

  ngOnInit(): void {
    this.event=this.data;   
  }
  

}
