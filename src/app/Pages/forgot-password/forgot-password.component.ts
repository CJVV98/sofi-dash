import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  formChange!: FormGroup;
  correctSend:boolean=false;
  continue:boolean=false;
  continueChange:boolean=false;
  userId:number=0;
  constructor(public service:UserService, private router:Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = new FormGroup({
      'email': new FormControl()
    });
    this.formChange=new FormGroup({
      'code': new FormControl(),
      'password': new FormControl(),
      'confirmPassword': new FormControl()
    })
  }

  sendEmail(){
     let email=this.form.value['email'];
     this.service.forgotPassword(email).subscribe((data:any)=>{
      console.log(data.data.userid);
      let error:string=data.error;
      this.userId=data.data.userid;
      this.continue=false;
      this.continueChange=false;
      if(error.length>2){
        this.showMessage("El correo ingresado no se encuentra registrado","Recuperar");
      }
      else{
        let infoUser=data.data;
        this.correctSend=true;
        this.continue=true;
        this.showMessage("Se ha enviado al correo ingresado un token, por favor verificar","Recuperar");
      }
     });
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  changePassword(){
    let password=this.formChange.value['password'];
    this.service.changePassword(this.userId, password).subscribe((data:any)=>{
     let error:string=data.error;
     if(error.length<3){
       setTimeout(()=>{
         this.showMessage("Cambio de clave exitoso","Recuperar");
       },10)
       this.goBack();
     }else{
      this.showMessage("Error en el cambio de contraseña, intente mas tarde","Recuperar");
   }
    });
  }
  goBack() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/login`]));
  }
  
  searchCode(event: any) {
    if(!this.correctSend) this.continue=false;
    const code = (event.target as HTMLInputElement).value;
    setTimeout(() => {
      this.continueChange=false;
       if(code.length==4){
          this.service.verifyCode(Number(code),this.userId).subscribe((data:any)=>{
            let error:string=data.error;
             if(error.length<3){
              this.formChange.controls['code'].disable();
              this.continueChange=true;
             }else{
              this.showMessage("Codigo errado","Recuperar");
           }
          })
       }
    }, 1)
  }

  valid():boolean{
    console.log(this.formChange.value['password']==this.formChange.value['confirmPassword'],this.formChange.value['password'].length>2);
   return this.formChange.value['password']==this.formChange.value['confirmPassword'] && this.formChange.value['password'].length>2
  }
}

