import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioPrincipalComponent } from './components/formulario-principal/formulario-principal.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { ListaItensComponent } from './components/lista-itens/lista-itens.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioPrincipalComponent,
    DadosPessoaisComponent,
    EnderecoComponent,
    ListaItensComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
