import { Injectable } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private reservaciones: Reservacion[];

  constructor(private firestore: AngularFirestore) {
    this.reservaciones = [];
  }

  public getReservaciones(): Observable<Reservacion[]> {
    return this.firestore.collection('reservaciones').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Reservacion;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getReservacionById(id: string){
    let result = this.firestore.collection('reservaciones').doc(id).valueChanges();
    return result;
  }

  public newReservacion(reservacion: Reservacion){
    this.firestore.collection('reservaciones').add(Reservacion);
  }

  public getFechaHoy(){
    return this.formatDate(new Date());
  }



  //FUNCIONES AUXILIARES

  public formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
}
