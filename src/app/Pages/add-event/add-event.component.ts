import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Events } from 'src/app/model/Events';
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
  edit:boolean=false;
  formEvent!: FormGroup;
  users!: User[];
  formResource!: FormGroup;
  file: any;
  url: string = "";
  constructor(private router: Router, private infoService: InfoEventService, private formBuilder: FormBuilder, private service: EventService, private serviceUser: UserService, private snackBar: MatSnackBar, private dialogo: MatDialog) {
  }

  ngOnInit(): void {
    if(this.infoService.getState()){
      this.eventEdit=this.infoService.getEvent();
      this.edit=true;
    }
    this.initForm();
    this.consultUsers();
  }
  initForm(): void {
    this.formEvent = new FormGroup({
      'name': new FormControl(this.edit?this.eventEdit.name:''),
      'start_date': new FormControl(this.edit?this.eventEdit.start_date:''),
      'end_date': new FormControl(this.edit?this.eventEdit.end_date:''),
      'state': new FormControl(this.edit?this.eventEdit.state:''),
      'information': new FormControl(this.edit?this.eventEdit.information:''),
      'place': new FormControl(this.edit?this.eventEdit.place:''),
      'resources': new FormControl(''),
      'user_id': new FormControl(this.edit?this.eventEdit.user_id:''),
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
    if(this.file!=null)
      this.getBase64(this.file);
    setTimeout(() => {
     console.log(this.file);
     this.event.name = this.formEvent.value['name'];
     this.event.start_date = this.formEvent.value['start_date'];
     this.event.end_date=this.formEvent.value['end_date'];
     this.event.information = this.formEvent.value['information'];
     this.event.place = this.formEvent.value['place'];
     this.event.state = this.formEvent.value['state'];
     this.event.user_id= this.formEvent.value['user_id'];
     if(this.file!=null){
     
      this.event.resources[0]=new Resource();
      this.event.resources[0].type="image";
      this.event.resources[0].url=this.url;
     }else{
      this.event.resources[0]=new Resource();
      this.event.resources[0].type="image";
      this.event.resources[0].url=this.eventEdit.resources[0].url;
     }
     if(this.edit){
       console.log("entrando");
      this.event.id=this.eventEdit.id;
      this.service.edit(this.event).subscribe(data => {
        this.showMessage("Evento editado exitosamente", "Editar");
      }, error => {
        this.showMessage(error, "Editar");
      });
     }else{
      this.service.add(this.event).subscribe(data => {
        this.showMessage("Evento registrado exitosamente", "Insertar");
      }, error => {
        this.showMessage(error, "Insertar");
      });
     }  
     this.cancel();
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
}
