import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-itens',
  templateUrl: './lista-itens.component.html',
  styleUrl: './lista-itens.component.css',
})
export class ListaItensComponent {
  @Input() formGroup!: FormGroup;
  novoItem: string = '';

  get listaArray(): FormArray {
    return this.formGroup.get('lista') as FormArray;
  }

  adicionarItem(): void {
    if (this.novoItem.trim()) {
      this.listaArray.push(new FormControl(this.novoItem.trim()));
      this.novoItem = '';
    }
  }

  removerItem(index: number): void {
    this.listaArray.removeAt(index);
  }
}
