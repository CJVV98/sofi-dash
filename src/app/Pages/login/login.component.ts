import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Session } from 'src/app/model/Session';
import { User } from 'src/app/model/User';
import { UserLog } from 'src/app/model/UserLog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserLog = new UserLog();
  constructor(private service:UserService,private router:Router,  public dialog: MatDialog,private snackBar: MatSnackBar) { }
  session: Session = new Session();

  ngOnInit(): void {
  }

  login(){
    this.service.login(this.user).subscribe(data=>{
      this.session=data;
      window.localStorage.setItem("token", this.session.access_token);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/usr/home`]));
    }, error=>{
      this.showMessage("Verifique sus credenciales","Error")
    })
   
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });

  }

}
