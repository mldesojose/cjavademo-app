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
    this.cursoService.update(this.curso)
    .subscribe( curso => {
      this.router.navigate(['/cursos'])
      swal.fire('Curso Actualizado', `Curso ${curso.nombre} actualizado con éxito!`, 'success')
    }

    )
  }
}
