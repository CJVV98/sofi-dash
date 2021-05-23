import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public init: boolean = true;
  thenBlock: TemplateRef<any> | null = null;
  constructor(private router: Router) { }
  public static titlePage: string;
  public page!: string;
  TemplateComponent=TemplateComponent;
  ngOnInit(): void {
    
    let token=window.localStorage.getItem("token");
    if(token?.length==0){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/login`]));
    }
  }
 
  navigate(route: string, title: string) {
      TemplateComponent.titlePage=title;     
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`${route}`])); 
  }

  logout(){
    window.localStorage.setItem("token", "");
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/login`]));
  }
  
}
