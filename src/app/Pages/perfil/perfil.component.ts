import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { InfoUserService } from 'src/app/services/infoUser.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user:User=new User();
  constructor(private infoUser:InfoUserService, private userService:UserService) { }

  ngOnInit(): void {
    let id=window.localStorage.getItem("user_id")?.toString();
    this.userService.consultUser(Number.parseInt(id==null || id==undefined ?"0":id)).subscribe((result: { data: User; })=>{
      if(!result){
        return;
      }
    
    this.user=result.data;
    console.log(this.user);
    });
  }

}
