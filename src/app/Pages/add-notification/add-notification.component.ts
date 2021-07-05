import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event, Router } from '@angular/router';
import { Events } from 'src/app/model/Events';
import {Notification} from 'src/app/model/Notification';
import { EventService } from 'src/app/services/event.service';
import {NotificationService} from 'src/app/services/notification.service';


@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  events!: Events[];
  formNotification!: FormGroup;

  constructor(private router: Router, private service: NotificationService, private snackBar: MatSnackBar, 
      private dialogo: MatDialog, private eventService:EventService) {
  }

  notification: Notification = new Notification;

  ngOnInit(): void {
    this.initForm();
    this.consultEvents();
  }

  public initForm(): void {
    this.formNotification = new FormGroup({
      'name': new FormControl(''),
      'details': new FormControl(''),
      'date': new FormControl(''),
      'event_id': new FormControl(''),

    });
  }
  consultEvents() {
    this.eventService.consult().subscribe((result: { data: Events[]; }) => {
      if (!result) {
        return;
      };
      this.events = result.data;
      this.events= this.events.filter(p => new Date(p.start_date)>new Date());
     
    });
    }
  

  public add() {
    this.notification.details = this.formNotification.value['details'];
    this.notification.date = this.formNotification.value['date'];
    this.notification.event_id=this.formNotification.value['event_id'];
    console.log(this.notification.event_id)
    this.service.add(this.notification).subscribe(()=>{
      this.showMessage("Notificacion registrada exitosamente", "Insertar");
    }, error => {
      this.showMessage(error, "Insertar");
    });
    this.initForm();
  }



  public cancel() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/usr/notificaciones`]));
  }


  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
