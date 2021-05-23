import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Events } from 'src/app/model/Events';
import { Notification } from 'src/app/model/Notification';
import { Resource } from 'src/app/model/Resource';
import { User } from 'src/app/model/User';
import { EventService } from 'src/app/services/event.service';
import { InfoEventService } from 'src/app/services/infoEvent.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: Events = new Events;
  eventEdit: Events = new Events;
  edit: boolean = false;
  min!: string;
  minEnd!: string;
  formEvent!: FormGroup;
  users!: User[];
  formResource!: FormGroup;
  file: any;
  userSelect!:User;
  url: string = "";
  constructor(private router: Router, private infoService: InfoEventService, private formBuilder: FormBuilder, private service: EventService, private serviceUser: UserService, private snackBar: MatSnackBar, private dialogo: MatDialog) {
  }

  ngOnInit(): void {
    if (this.infoService.getState()) {
      this.eventEdit = this.infoService.getEvent();
      this.edit = true;
      
    }
    this.min = new Date().toISOString().substring(0, 10);
    this.minEnd = this.min;
    this.initForm();
    this.consultUsers();
  }
  initForm(): void {
    this.formEvent = new FormGroup({
      'name': new FormControl(this.edit ? this.eventEdit.name : ''),
      'start_date': new FormControl(this.edit ? this.eventEdit.start_date.substring(0, 10) : ''),
      'start_time': new FormControl(this.edit ? this.eventEdit.start_date.substring(11, 16) : ''),
      'end_date': new FormControl(this.edit ? this.eventEdit.end_date.substring(0, 10) : ''),
      'end_time': new FormControl(this.edit ? this.eventEdit.end_date.substring(11, 16) : ''),
      'state': new FormControl(this.edit ? this.eventEdit.state : ''),
      'information': new FormControl(this.edit ? this.eventEdit.information : ''),
      'place': new FormControl(this.edit ? this.eventEdit.place : ''),
      'resources': new FormControl(''),
      'user_id': new FormControl(this.edit ? this.eventEdit.user_id : ''),
    });
    this.formResource = this.formBuilder.group({
      fileAr: ['']
    });
  }

  consultUsers() {
    this.serviceUser.consultUsers().subscribe((result: { data: User[]; }) => {
      if (!result) {
        return;
      };
      this.users = result.data;
      if(this.edit && false){
        this.userSelect=this.users.filter(user=> user.id == this.eventEdit.user_id)[0];
      }
    });
    }
  loadFile(event: any) {
    this.file = event.srcElement.files[0];
    this.formResource.get('fileAr')?.setValue(this.file);
  }

  getBase64(file: any) {
    var image = "";
    console.log("codi");
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      image = reader.result == null ? "" : reader.result.toString();
    };
    setTimeout(() => {
      this.url = image;
      reader.onerror = function (error) {
        console.log(error);;
      };
    }, 1000);

  }

  add() {
    if (this.file != null)
      this.getBase64(this.file);
    setTimeout(() => {
      console.log(this.file);
      this.event.name = this.formEvent.value['name'];
      this.event.start_date = this.formEvent.value['start_date'] + " " + this.formEvent.value['start_time'];
      this.event.end_date = this.formEvent.value['end_date'] + " " + this.formEvent.value['end_time'];
      if (new Date(this.event.start_date) > new Date(this.event.end_date))
        this.showMessage("Verifique las fechas seleccionadas", "Error");
      else {
        this.event.information = this.formEvent.value['information'];
        this.event.place = this.formEvent.value['place'];
        this.event.state = this.formEvent.value['state'];
        this.event.user_id = this.formEvent.value['user_id'];
        if (this.file != null) {
          this.event.resources[0] = new Resource();
          this.event.resources[0].type = "image";
          this.event.resources[0].url = this.url;
        } else {
          this.event.resources[0] = new Resource();
          this.event.resources[0].type = "image";
          this.event.resources[0].url = this.eventEdit.resources[0].url;
        }
        if (this.edit) {
          this.event.id = this.eventEdit.id;       
        } else {
          this.event.notifications[0]=new Notification();
          this.event.notifications[0].details=this.event.name;
          this.event.notifications[0].date=new Date().toISOString();
        }
        this.service.addEdit(this.event, this.edit).subscribe(data => {
          let message=this.edit?"Editar":"Registrar";
          this.showMessage("Operacion exitosa", message+" evento");
        }, error => {
          this.showMessage(error, "Editar");
        });
        this.cancel();
      }
    }, 2000);

  }

  cancel() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/usr/eventos`]));
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  changeDate(event: any) {
    this.minEnd = event;
  }
}
