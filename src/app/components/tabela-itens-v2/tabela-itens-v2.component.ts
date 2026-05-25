import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DadoLinha, LinhaTabela } from '../../models/linha-tabela.model';

@Component({
  selector: 'app-tabela-itens-v2',
  templateUrl: './tabela-itens-v2.component.html',
  styleUrl: './tabela-itens-v2.component.css',
})
export class TabelaItensV2Component implements OnInit {
  @Input() linhas!: FormArray;
  @Input() dados: DadoLinha[] = [];

  readonly colunas = ['data', 'campo', 'categoria', 'status'];

  dataSource = new MatTableDataSource<LinhaTabela>([]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dados.forEach((dado) => this.linhas.push(this.novaLinha(dado)));
    this.atualizarDataSource();
  }

  private novaLinha(dado: Partial<DadoLinha> = {}): FormGroup {
    return this.fb.group({
      data: [dado.data ?? null, Validators.required],
      campo: [dado.campo ?? '', Validators.required],
    });
  }

  getLinha(index: number): FormGroup {
    return this.linhas.at(index) as FormGroup;
  }

  private atualizarDataSource(): void {
    this.dataSource.data = this.dados.map((dado, i) => ({ index: i, ...dado }));
  }

  adicionarLinha(): void {
    const novo: DadoLinha = { data: null, campo: '', categoria: 'Nova Categoria', status: 'Ativo' };
    this.dados.push(novo);
    this.linhas.push(this.novaLinha(novo));
    this.atualizarDataSource();
  }

  removerLinha(index: number): void {
    if (this.linhas.length > 1) {
      this.dados.splice(index, 1);
      this.linhas.removeAt(index);
      this.atualizarDataSource();
    }
  }
}
