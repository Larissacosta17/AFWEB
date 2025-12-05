import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Financa{
_id?: string;
nome: string;
valor: number;
categoria: string;
}

@Injectable({
  providedIn: 'root'
})

export class Service{
  private http = inject(HttpClient);
  private base = `http://localhost:4000/financas`;

  listar(): Observable<Financa[]> {
  return this.http.get<Financa[]>(this.base);
  }

  criar(financa: Financa): Observable<Financa> {
    console.log (financa);  
    return this.http.post<Financa>(this.base, financa);

  }

}