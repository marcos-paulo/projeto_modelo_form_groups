import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DadoLinha, LinhaTabela } from '../../models/linha-tabela.model';

@Component({
  selector: 'app-tabela-itens',
  templateUrl: './tabela-itens.component.html',
  styleUrl: './tabela-itens.component.css',
})
export class TabelaItensComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() dados: DadoLinha[] = [];

  readonly colunas = ['data', 'campo', 'categoria', 'status'];

  dataSource = new MatTableDataSource<LinhaTabela>([]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dados.forEach((dado) => this.linhasArray.push(this.novaLinha(dado)));
    this.atualizarDataSource();
  }

  get linhasArray(): FormArray {
    return this.formGroup.get('linhas') as FormArray;
  }

  private novaLinha(dado: Partial<DadoLinha> = {}): FormGroup {
    return this.fb.group({
      data: [dado.data ?? null, Validators.required],
      campo: [dado.campo ?? '', Validators.required],
    });
  }

  getLinha(index: number): FormGroup {
    return this.linhasArray.at(index) as FormGroup;
  }

  private atualizarDataSource(): void {
    this.dataSource.data = this.dados.map((dado, i) => ({ index: i, ...dado }));
  }

  adicionarLinha(): void {
    const novo: DadoLinha = { data: null, campo: '', categoria: 'Nova Categoria', status: 'Ativo' };
    this.dados.push(novo);
    this.linhasArray.push(this.novaLinha(novo));
    this.atualizarDataSource();
  }

  removerLinha(index: number): void {
    if (this.linhasArray.length > 1) {
      this.dados.splice(index, 1);
      this.linhasArray.removeAt(index);
      this.atualizarDataSource();
    }
  }
}
