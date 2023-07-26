import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnosUtl } from 'src/app/interfaces/utl.interface';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  regAlumno: AlumnosUtl = {
    id: 0,
    nombre: '',
    edad: 0,
    correo: ''
  };

  constructor(
    private alumnosutl: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const alumnoId = this.route.snapshot.paramMap.get('id');
    if (alumnoId) {
      this.obtenerAlumno(+alumnoId);
    }
  }

  obtenerAlumno(alumnoId: number): void {
    this.alumnosutl.getAlumno(alumnoId).subscribe({
      next: (alumno) => {
        this.regAlumno = alumno;
      },
      error: (e) => console.error(e)
    });
  }

  editar(): void {
    this.alumnosutl.actualizarAlumno(this.regAlumno.id, this.regAlumno).subscribe({
      next: () => {
        console.log('Alumno actualizado exitosamente');
        this.router.navigate(['verAlumnos']);
      },
      error: (e) => console.error(e)
    });
  }
}
