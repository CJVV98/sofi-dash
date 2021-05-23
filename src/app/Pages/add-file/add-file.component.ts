import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  formArchivo!: FormGroup;
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar, 
              private formBuilder:FormBuilder, private service:UserService) { }

  ngOnInit(): void {
     this.formArchivo=this.formBuilder.group({
       fileAr:['']
     });
  }

  loadFile(event:any){
      const file=event.srcElement.files[0];
      this.formArchivo.get('fileAr')?.setValue(file);
  }

  register(){
    const formData=new FormData();
    formData.append('file',this.formArchivo.get('fileAr')?.value);
    this.service.import(formData).subscribe(data=>{
      this.showMessage("Se ha cargado correctamente el archivo", "Insertar");
    }, error => {
      this.showMessage("Error en la carga del archivo", "Insertar");
    });  
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
