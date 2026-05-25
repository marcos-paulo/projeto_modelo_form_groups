import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DadoLinha } from '../../models/linha-tabela.model';

@Component({
  selector: 'app-formulario-principal',
  templateUrl: './formulario-principal.component.html',
  styleUrl: './formulario-principal.component.css',
})
export class FormularioPrincipalComponent implements OnInit {
  formularioPrincipal!: FormGroup;
  dadosSubmetidos: any = null;

  readonly dadosTabela: DadoLinha[] = [
    { data: new Date('2024-01-15'), campo: 'Item inicial A', categoria: 'Categoria A', status: 'Ativo' },
    { data: new Date('2024-03-22'), campo: 'Item inicial B', categoria: 'Categoria B', status: 'Inativo' },
    { data: null,                   campo: 'Item inicial C', categoria: 'Categoria C', status: 'Pendente' },
  ];

  constructor(private fb: FormBuilder) {}

  get generateForm() {
    return this.fb.group({
      dadosPessoais: this.fb.group({
        nome: ['', Validators.required],
        cpf: ['', Validators.required],
      }),
      itens1: this.fb.group({
        descricao: ['', Validators.required],
        lista: this.fb.array<string>([], (a) => {
          return a.value.length > 0 ? null : { required: true };
        }),
      }),
      tabelaItens: this.fb.group({
        linhas: this.fb.array([]),
      }),
      tabelaItens2: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.formularioPrincipal = this.generateForm;
  }

  onSubmit(): void {
    if (this.formularioPrincipal.valid) {
      this.dadosSubmetidos = this.formularioPrincipal.value;
      console.log('Dados do formulário:', this.dadosSubmetidos);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }

  get dadosPessoaisGroup(): FormGroup {
    return this.formularioPrincipal.get('dadosPessoais') as FormGroup;
  }

  get itensGroup1(): FormGroup {
    return this.formularioPrincipal.get('itens1') as FormGroup;
  }

  get tabelaItensGroup(): FormGroup {
    return this.formularioPrincipal.get('tabelaItens') as FormGroup;
  }

  get tabelaItens2Array(): FormArray {
    return this.formularioPrincipal.get('tabelaItens2') as FormArray;
  }
}
