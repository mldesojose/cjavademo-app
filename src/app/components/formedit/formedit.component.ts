import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../service/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../shared/Curso';
import swal from 'sweetalert2'

@Component({
  selector: 'app-formedit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formedit.component.html',
  styleUrl: './formedit.component.css'
})
export class FormeditComponent {
  curso: Curso = new Curso()
  titulo:string = "Actualizar curso"

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



  update():void{

    if (!this.curso.aula || !this.aulasPermitidas.includes(this.curso.aula)) {
      swal.fire('Error', 'El valor del aula no es válido. Debe ser A01, B01, C01, D01 o E01.', 'error');
      return;  // Si el aula no es válida, no continuar con la creación
    }

    this.cursoService.update(this.curso)
    .subscribe( curso => {
      this.router.navigate(['/cursos'])
      swal.fire('Curso Actualizado', `Curso ${curso.nombre} actualizado con éxito!`, 'success')
    }

    )
  }
}
