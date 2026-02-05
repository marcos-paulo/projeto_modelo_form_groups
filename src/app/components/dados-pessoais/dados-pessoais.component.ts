import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.css',
})
export class DadosPessoaisComponent {
  @Input() formGroup!: FormGroup;
}
