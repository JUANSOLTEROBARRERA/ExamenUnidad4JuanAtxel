import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  public reservaciones: Reservacion[];
  public isNearest: boolean = false;
  constructor(private reservacionService:ReservacionService, private router: Router) {

    this.reservacionService.getReservaciones().subscribe(res => {
      this.reservaciones = res;
      console.log(this.reservaciones)
    });

  }

  ngOnInit() {
  }

  public nearest(){

  }

}
