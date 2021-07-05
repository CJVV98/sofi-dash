import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Events } from 'src/app/model/Events';
import { EventService } from 'src/app/services/event.service';
import { InfoEventService } from 'src/app/services/infoEvent.service';
import { MoreEventComponent } from '../more-event/more-event.component';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
  public events!: Array<Events>;
  now:Date=new Date();
  dataSource=  new MatTableDataSource<Events>();
  displayedColums: string[] = ['id', 'name', 'start','end', 'place', 'actions'];
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  
  constructor(private service:EventService, private serviceInfo:InfoEventService, private router:Router,  private snackBar: MatSnackBar, private dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.showList();
     },1000);
  }


  showList(){
    this.service.consult().subscribe((result: { data: Events[]; })=>{
      if(!result){
        return;
      }
    ;
      this.events=result.data;
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(){
    this.serviceInfo.setState(false);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/evento`]));
  }

  moreEvent(event:Events){
    this.dialog.open(MoreEventComponent, {
      width: '60%',
       data:event,
       panelClass: 'custom-modalbox'
    });
  }

  edit(event:Events){
    this.serviceInfo.setState(true);
    this.serviceInfo.setEvent(event);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/usr/evento`]));
  }

  remove(id:number){
    this.service.remove(id).subscribe(data => {
      this.showMessage("Operacion exitosa", " Eliminar evento");
      this.showList();
    });
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  validDate(date:string):any{
    console.log(date,new Date(date)>=new Date(), Date.parse(date))
     return new Date(date)>=new Date();
  }

}


