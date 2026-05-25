import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioPrincipalComponent } from './components/formulario-principal/formulario-principal.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { ListaItensComponent } from './components/lista-itens/lista-itens.component';
import { TabelaItensComponent } from './components/tabela-itens/tabela-itens.component';
import { TabelaItensV2Component } from './components/tabela-itens-v2/tabela-itens-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioPrincipalComponent,
    DadosPessoaisComponent,
    EnderecoComponent,
    ListaItensComponent,
    TabelaItensComponent,
    TabelaItensV2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
