import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-principal',
  templateUrl: './formulario-principal.component.html',
  styleUrl: './formulario-principal.component.css',
})
export class FormularioPrincipalComponent implements OnInit {
  formularioPrincipal!: FormGroup;
  dadosSubmetidos: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioPrincipal = this.fb.group({
      dadosPessoais: this.fb.group({
        nome: ['', Validators.required],
        cpf: ['', Validators.required],
      }),
      endereco: this.fb.group({
        rua: ['', Validators.required],
        cidade: ['', Validators.required],
      }),
      itens1: this.fb.group({
        descricao: ['', Validators.required],
        lista: this.fb.array<string>([], (a) => {
          return a.value.length > 0 ? null : { required: true };
        }),
      }),
      itens2: this.fb.group({
        descricao: ['', Validators.required],
        lista: this.fb.array<string>([], (a) => {
          return a.value.length > 0 ? null : { required: true };
        }),
      }),
    });
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

  get enderecoGroup(): FormGroup {
    return this.formularioPrincipal.get('endereco') as FormGroup;
  }

  get itensGroup1(): FormGroup {
    return this.formularioPrincipal.get('itens1') as FormGroup;
  }

  get itensGroup2(): FormGroup {
    return this.formularioPrincipal.get('itens2') as FormGroup;
  }
}
