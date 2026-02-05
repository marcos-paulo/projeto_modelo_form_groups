# Projeto Modelo - FormGroups Aninhados

## Descrição

Este projeto demonstra o uso de **FormGroups aninhados** no Angular 18, utilizando arquitetura baseada em módulos (não standalone).

## Estrutura de Componentes

### 1. Componente Pai: `FormularioPrincipalComponent`

- **Localização**: `src/app/components/formulario-principal/`
- **Responsabilidade**:
  - Gerencia o formulário principal com FormGroups aninhados
  - Contém o botão de submissão
  - Exibe os dados submetidos na tela
  - Passa os subformulários para os componentes filhos via `@Input`

### 2. Componente Filho 1: `DadosPessoaisComponent`

- **Localização**: `src/app/components/dados-pessoais/`
- **Campos**:
  - Nome (obrigatório)
  - CPF (obrigatório)

### 3. Componente Filho 2: `EnderecoComponent`

- **Localização**: `src/app/components/endereco/`
- **Campos**:
  - Rua (obrigatório)
  - Cidade (obrigatório)

## Técnicas Utilizadas (Melhores Práticas Angular)

### 1. **FormGroups Aninhados**

```typescript
this.formularioPrincipal = this.fb.group({
  dadosPessoais: this.fb.group({
    nome: ["", Validators.required],
    cpf: ["", Validators.required],
  }),
  endereco: this.fb.group({
    rua: ["", Validators.required],
    cidade: ["", Validators.required],
  }),
});
```

### 2. **Passagem de FormGroup via @Input**

Os componentes filhos recebem seus subformulários como `@Input`:

```typescript
@Input() formGroup!: FormGroup;
```

### 3. **Getters para Acesso aos SubFormGroups**

```typescript
get dadosPessoaisGroup(): FormGroup {
  return this.formularioPrincipal.get('dadosPessoais') as FormGroup;
}
```

### 4. **Validação Reativa**

- Todos os campos são obrigatórios
- Validação em tempo real
- Mensagens de erro condicionais
- Botão desabilitado quando formulário inválido

### 5. **Separação de Responsabilidades**

- Cada componente filho gerencia apenas sua parte do formulário
- O componente pai coordena a submissão
- Reutilização de componentes facilitada

## Como Executar

```bash
# Instalar dependências (se necessário)
npm install

# Iniciar servidor de desenvolvimento
npm start
# ou
ng serve

# Acessar no navegador
http://localhost:4200
```

## Como Usar

1. Preencha todos os campos obrigatórios nos dois subformulários
2. O botão "Enviar Formulário" será habilitado quando todos os campos estiverem válidos
3. Clique no botão para submeter
4. Os dados aparecerão formatados na tela abaixo do formulário

## Estrutura de Dados

Ao submeter, os dados são organizados da seguinte forma:

```json
{
  "dadosPessoais": {
    "nome": "João Silva",
    "cpf": "123.456.789-00"
  },
  "endereco": {
    "rua": "Rua das Flores",
    "cidade": "São Paulo"
  }
}
```

## Características do Projeto

- ✅ Angular 18
- ✅ Arquitetura baseada em módulos (não standalone)
- ✅ Reactive Forms
- ✅ FormGroups aninhados
- ✅ Validação reativa
- ✅ Componentização
- ✅ Estilos CSS responsivos
- ✅ Exibição de dados submetidos
