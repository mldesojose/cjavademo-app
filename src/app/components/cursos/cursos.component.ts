import { Component, OnInit } from '@angular/core';



import { CommonModule } from '@angular/common';

import 	swal from 'sweetalert2'

import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../shared/Curso';
import { CursoService } from '../../service/curso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
  providers: [CursoService]
})
export class CursosComponent implements OnInit{
  cursos?:Curso[];
  constructor(private cursoService: CursoService,private router: Router) { 
  }

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(
      cursos => this.cursos = cursos
   );
   console.log(this.cursos?.flatMap(curso => curso.nombre))
  }

  delete(curso: Curso): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el curso ${curso.nombre}?`,
      showCloseButton: true,
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {  // Asegurarse de que el resultado sea 'confirmado'
        this.cursoService.delete(curso.id).subscribe(
          response => {
            // Muestra un mensaje de éxito
            swal.fire(
              'Curso Eliminado!',
              `Curso ${curso.nombre} eliminado con éxito.`,
              'success'
            );
            
            // Después de eliminar, volvemos a obtener la lista de cursos actualizada
            this.loadCursos();
          },
          error => {
            swal.fire(
              'Error!',
              'Hubo un problema al eliminar el curso.',
              'error'
            );
          }
        );
      }
    });
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(
      cursos => this.cursos = cursos,
      error => console.error('Error al obtener cursos:', error)
    );
  }


}
