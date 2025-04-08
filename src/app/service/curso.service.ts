import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Curso } from '../shared/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlEndPoint: string = 'http://localhost:8085/api/cursos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Curso[]),
      catchError(error => {
        console.error('Error obteniendo cursos:', error);
        return throwError(error);
      })
    );
  }

  create(curso: Curso) : Observable<Curso> {
    return this.http.post<Curso>(this.urlEndPoint, curso, {headers: this.httpHeaders})
  }

  getCurso(id?:number): Observable<Curso>{
    return this.http.get<Curso>(`${this.urlEndPoint}/${id}`)
  }

  update(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.urlEndPoint}/${curso.id}`, curso, {headers: this.httpHeaders})
  }

  delete(id?:number): Observable<Curso>{
    return this.http.delete<Curso>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}
