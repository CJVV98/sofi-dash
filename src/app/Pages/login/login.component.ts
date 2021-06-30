import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Session } from 'src/app/model/Session';
import { User } from 'src/app/model/User';
import { UserLog } from 'src/app/model/UserLog';
import { InfoUserService } from 'src/app/services/infoUser.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserLog = new UserLog();
  constructor(private service:UserService,private router:Router,  public dialog: MatDialog,private snackBar: MatSnackBar, private info:InfoUserService) { }
  session: Session = new Session();

  ngOnInit(): void {
  }

  login(){
    this.service.login(this.user).subscribe(data=>{
      this.session=data;
      window.localStorage.setItem("token", this.session.access_token);
      window.localStorage.setItem("user_id", this.session.user.id.toString());
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/usr/home`]));
      
    }, error=>{
      this.showMessage("Verifique sus credenciales","Error")
    })
   
  }

  forgotPassword(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/recuperar`]));
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });

  }

}
