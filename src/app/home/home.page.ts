import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  /*
          --------OBTENER TODOS LOS REGISTROS

          public getStudents() : Observable<Student[]> {
            return this.firestore.collection('students').snapshotChanges().pipe(
              map(actions => {
                return actions.map (a=>{
                    const data = a.payload.doc.data() as Student;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
              })
            );
          }

          --------OBTENER REGISTRO POR ID

          public getStudentById(id: string){
            let result = this.firestore.collection('students').doc(id).valueChanges();
            return result;
          }

          --------ADD 

          public newStudent(student: Student) {
            this.firestore.collection('students').add(student);
          }

          --------UPDATE

          this.firestore
          .collection('rooms')
          .doc(id)
          .set(
            { room: cuarto.room, f_noDisp: tengofechas }
          )
          this.actualizarfecha=0;
          this.cuantas--;
          
          public updateStudent(student:Student,id:string){
            this.firestore.doc('students/'+id).update(student);
          }
          
          --------DELETE

          public removeStudent(id: string){
            this.firestore.collection('students').doc(id).delete();
            return this.students;
          }
          
          */
}
