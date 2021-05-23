import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Keyword } from 'src/app/model/Keyword';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-add-keyword',
  templateUrl: './add-keyword.component.html',
  styleUrls: ['./add-keyword.component.css']
})
export class AddKeywordComponent implements OnInit {
  keyword!: Keyword;
  constructor(public service: ContentService, public dialog: MatDialog,private snackBar: MatSnackBar) {}
  formKeyword!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  add(){
    this.keyword=new Keyword();
    this.keyword.name=this.formKeyword.value['name'];
    this.service.addKeyword(this.keyword).subscribe(data=>{
      this.showMessage("Registro exitoso", "Insertar palabra clave");
      this.initForm();
    },error=>{
      this.showMessage(error, "Insertar permiso");
    })
  }
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });

  }

  initForm() {
    this.formKeyword = new FormGroup({
      'name': new FormControl('')
    });
  }

}

