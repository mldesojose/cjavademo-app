import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { FormsModule } from '@angular/forms'
import { CursoService } from '../../service/curso.service';
import { Curso } from '../../shared/Curso';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [FormsModule],
  standalone: true
})
export class FormComponent implements OnInit {

  curso: Curso = new Curso()
  titulo:string = "Crear curso"

  aulasPermitidas: string[] = ['A01', 'B01', 'C01', 'D01', 'E01'];

  constructor(private cursoService: CursoService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCurso()
  }

  cargarCurso(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.cursoService.getCurso(id).subscribe( (curso) => this.curso = curso)
      }
    })
  }

  create(): void {

    if (!this.curso.aula || !this.aulasPermitidas.includes(this.curso.aula)) {
      swal.fire('Error', 'El valor del aula no es válido. Debe ser A01, B01, C01, D01 o E01.', 'error');
      return;  // Si el aula no es válida, no continuar con la creación
    }


    this.cursoService.create(this.curso)
      .subscribe(curso => {
        this.router.navigate(['/cursos'])
        swal.fire('Nuevo curso', `Curso ${curso.nombre} creado con éxito!`, 'success')
      }
      );
  }

  

}
