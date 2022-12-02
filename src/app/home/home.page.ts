import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private myForm: FormGroup;
  private stID: string;
  public validationMessages: object;
  lastEmittedValue: RangeValue;
  public postresB: boolean = false
  public brincolinB: boolean = false
  public futbolitoB: boolean = false
  public total: number = 0
  public tel = ""
  public nom = ""
  public dom = ""
  public today: string;

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    this.total+=Number(this.lastEmittedValue)*100
  }
  constructor(private fb:FormBuilder,private rs:ReservacionService) {
    this.tel = localStorage.getItem('tel');
    this.nom = localStorage.getItem('nom');
    this.dom = localStorage.getItem('dom');

    this.myForm = this.fb.group({
      fecha:[""],
      alberca:[""],
      postres:[""],
      brincolin:[],
      futbolito:[]
    });

    this.today = this.formatDate(new Date());
    
    this.myForm.controls.fecha.setValue(this.today);
  }

  public formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate() + 1),
    ].join('-');
  }

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public postresChn(){
    if(!this.postresB)this.total+=150
    else this.total-=150
    this.postresB = !this.postresB
    
  }

  public brincolinChn(){
    if(!this.brincolinB)this.total+=200
    else this.total-=200
    this.brincolinB = !this.brincolinB
  }

  public futbolitoChn(){
    if(!this.brincolinB)this.total+=100
    else this.total-=100

    this.futbolitoB = !this.futbolitoB
  }

  public rese:Reservacion[];
  public fechasBloq: string[]
  public verificar(){
    this.rs.getReservaciones().subscribe(res => {
      this.rese = res;
      console.log(this.rese)
    });
    this.rese.forEach(element => {
      this.fechasBloq.push(element.fecha)
      if(!element.fecha == this.myForm.controls.fecha.value)
      this.total+=1000
    });

    this.myForm.controls.fecha.value
  }

  public newReservation(){
    const nReserv: Reservacion = {
      cliente: {
        telefono: this.tel,
        domicilio: this.dom,
        nombre: this.nom
      },
      fecha: this.myForm.get('fecha').value,
      total: this.total
    }
    console.log(nReserv)
    this.rs.newReservacion(nReserv)
  }
}
