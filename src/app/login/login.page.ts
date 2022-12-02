import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;
  public reservaciones: Reservacion[]
  constructor(private fb: FormBuilder, private router: Router, private reservacionService:ReservacionService) { 
    this.reservacionService.getReservaciones().subscribe(res => {
      this.reservaciones = res;
      console.log(this.reservaciones)
    });
  }

  public ingresar(){
    if(this.myForm.get('telefono').value==='admin'){
      this.router.navigate(['/reservaciones'])
    }else{
      this.reservaciones.forEach(item => {
        if(this.myForm.get('telefono').value==item.cliente.telefono){
          localStorage.setItem('tel', item.cliente.telefono);
          localStorage.setItem('nom', item.cliente.nombre);
          localStorage.setItem('dom', item.cliente.domicilio);
          this.router.navigate(['home'])
        }      
      })
    }
  }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        telefono: [""],
      }
    );
  }

}