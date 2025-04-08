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
    this.cursoService.create(this.curso)
      .subscribe(curso => {
        this.router.navigate(['/cursos'])
        swal.fire('Nuevo curso', `Curso ${curso.nombre} creado con éxito!`, 'success')
      }
      );
  }

  

}
