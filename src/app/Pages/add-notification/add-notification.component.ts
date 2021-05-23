import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Notification} from 'src/app/model/Notification';
import {NotificationService} from 'src/app/services/notification.service';


@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {

  formNotification!: FormGroup;

  constructor(private router: Router, private service: NotificationService, private snackBar: MatSnackBar, private dialogo: MatDialog) {
  }

  notification: Notification = new Notification;

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formNotification = new FormGroup({
      'name': new FormControl(''),
      'details': new FormControl(''),
      'date': new FormControl(''),

    });
  }

  public add() {
    this.notification.details = this.formNotification.value['details'];
    this.notification.date = this.formNotification.value['date'];
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
