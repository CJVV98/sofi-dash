import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {NotificationService} from 'src/app/services/notification.service';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {

  public notifications!: Array<Notification>;
  dataSource=  new MatTableDataSource<Notification>();
  displayedColums: string[] = ['id',  'date', 'details' , 'actions'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private service:NotificationService, private router:Router) { }

  ngOnInit(): void {
    this.showList();
  }


  showList(){
    this.service.consult().subscribe((result: { data: Notification[]; })=>{
      if(!result){
        return;
      }
      ;
      this.notifications=result.data;
      this.dataSource = new MatTableDataSource(this.notifications);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/inicio/notificacion`]));
  }

}
