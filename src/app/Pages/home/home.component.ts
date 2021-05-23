import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photo:string="../../../assets/img/13188.png";
  constructor() { }

  ngOnInit(): void {
  }

}
