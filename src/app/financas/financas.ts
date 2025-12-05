import { Component, inject } from '@angular/core';
import { Financa, Service } from '../service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './financas.html',
  styleUrls: ['./financas.css'],
})

export class Financas {

private api = inject(Service);

financas: Financa[] = [];
carregando = false;
salvando = false;
erro = '';

//binding do form
nome = '';
valor: number | null = null;
categoria = '';

ngOnInit() {this.carregar();}

carregar() {
  this.carregando = true;
  this.api.listar().subscribe({
    next: xs => { this.financas = xs; this.carregando = false;},
    error: e => { this.erro = e.message ?? 'falha ao carregar'; 
      this.carregando = false;}
  });
} 

criar() {
  if (!this.nome || this.valor == null  ) return;

  const financa: Financa = {
    nome: this.nome,
    valor: Number(this.valor),
    categoria: this.categoria,
  };

  this.salvando = true;
  this.api.criar(financa).subscribe({
    next: _ =>{
      this.nome = ''; this.valor = null; this.categoria = '';
      this.salvando = false; this.carregar();
    },
    error: e => {this.erro = e.message ?? 'falha ao criar';
      this.salvando = false; }
  });
}


}
