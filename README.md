# Projeto Modelo — Reactive Forms com FormGroups e Angular Material

Projeto Angular 18 criado para estudar e documentar padrões de **Reactive Forms** com `FormGroup`, `FormArray` e integração com **Angular Material Table**.

---

## Sumário

- [Instalação e execução](#instalação-e-execução)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Arquitetura de formulários](#arquitetura-de-formulários)
- [Integração com Angular Material](#integração-com-angular-material)
- [Tabela com FormArray — duas abordagens comparadas](#tabela-com-formarray--duas-abordagens-comparadas)
  - [v1: FormGroup wrapper + formArrayName](#v1-formgroup-wrapper--formarrayname)
  - [v2: FormArray direto via @Input](#v2-formarray-direto-via-input)
- [Dados externos via @Input](#dados-externos-via-input)
- [Model compartilhado](#model-compartilhado)

---

## Instalação e execução

```bash
npm install
npm start        # http://localhost:4200
npm run build
```

---

## Estrutura do projeto

```
src/app/
├── models/
│   └── linha-tabela.model.ts          # Interfaces DadoLinha e LinhaTabela
└── components/
    ├── formulario-principal/           # Componente pai — controla todo o formulário
    ├── dados-pessoais/                 # Filho: campos nome e CPF
    ├── endereco/                       # Filho: campos rua e cidade
    ├── lista-itens/                    # Filho: lista dinâmica com FormArray de strings
    ├── tabela-itens/                   # Filho: tabela Material — abordagem v1
    └── tabela-itens-v2/                # Filho: tabela Material — abordagem v2
```

---

## Arquitetura de formulários

O `formulario-principal` cria e possui o `FormGroup` raiz. Cada componente filho recebe **uma fatia** do formulário via `@Input()` e trabalha apenas com ela, mantendo o estado centralizado no pai.

```
formularioPrincipal (FormGroup)
 ├── dadosPessoais  (FormGroup)  → <app-dados-pessoais>
 ├── itens1         (FormGroup)  → <app-lista-itens>
 │    └── lista     (FormArray<string>)
 ├── tabelaItens    (FormGroup)  → <app-tabela-itens>   [v1]
 │    └── linhas    (FormArray<FormGroup>)
 └── tabelaItens2   (FormArray<FormGroup>)  → <app-tabela-itens-v2>  [v2]
```

### Como o pai distribui os grupos

```ts
// formulario-principal.component.ts
get tabelaItensGroup(): FormGroup {
  return this.formularioPrincipal.get('tabelaItens') as FormGroup;
}

get tabelaItens2Array(): FormArray {
  return this.formularioPrincipal.get('tabelaItens2') as FormArray;
}
```

```html
<!-- formulario-principal.component.html -->
<app-tabela-itens   [formGroup]="tabelaItensGroup"  [dados]="dadosTabela"></app-tabela-itens>
<app-tabela-itens-v2 [linhas]="tabelaItens2Array"   [dados]="dadosTabela"></app-tabela-itens-v2>
```

---

## Integração com Angular Material

Pacotes instalados manualmente (sem `ng add`, que exige acesso à rede durante o `schematic`):

```bash
npm install @angular/material@18 @angular/cdk@18
```

Configurações necessárias:

**`src/styles.css`** — tema pré-compilado:
```css
@import '@angular/material/prebuilt-themes/indigo-pink.css';
```

**`app.module.ts`** — módulos importados:
```ts
BrowserAnimationsModule   // obrigatório para animações do Material
MatTableModule
MatFormFieldModule
MatInputModule
MatDatepickerModule
MatNativeDateModule       // adaptador de datas nativo (sem Luxon/Moment)
MatButtonModule
MatIconModule
```

---

## Tabela com FormArray — duas abordagens comparadas

Ambos os componentes exibem uma `mat-table` com 4 colunas:

| Coluna      | Tipo              | Faz parte do FormGroup? |
|-------------|-------------------|-------------------------|
| **data**    | `MatDatepicker`   | ✅ Sim                  |
| **campo**   | `MatInput`        | ✅ Sim                  |
| **categoria** | Somente leitura | ❌ Não                  |
| **status**  | Badge colorido    | ❌ Não                  |

---

### v1: FormGroup wrapper + `formArrayName`

**`@Input`:** recebe um `FormGroup` que contém internamente o `FormArray`:

```ts
@Input() formGroup!: FormGroup;

get linhasArray(): FormArray {
  return this.formGroup.get('linhas') as FormArray;
}
```

**Template** — 3 níveis de contexto de formulário empilhados:

```html
<div [formGroup]="formGroup">          <!-- nível 1: FormGroup raiz -->
  <div formArrayName="linhas">         <!-- nível 2: aponta para o FormArray "linhas" -->
    <div [formGroupName]="linha.index"> <!-- nível 3: índice da linha no array -->
      <input formControlName="data" />
      <input formControlName="campo" />
    </div>
  </div>
</div>
```

**Por que `linha.index` funciona?**

O `mat-table` itera sobre o `dataSource` (objetos `LinhaTabela`), não sobre o `FormArray`. O campo `index` é gravado em cada objeto do dataSource para servir de ponte:

```ts
this.dataSource.data = this.dados.map((dado, i) => ({ index: i, ...dado }));
```

Com `formArrayName="linhas"` ativo no contexto, o Angular interpreta `[formGroupName]="linha.index"` como posição no `FormArray`.

---

### v2: FormArray direto via `@Input`

**`@Input`:** recebe o `FormArray` diretamente, sem o `FormGroup` wrapper:

```ts
@Input() linhas!: FormArray;

getLinha(index: number): FormGroup {
  return this.linhas.at(index) as FormGroup;
}
```

**Template** — 1 único nível de contexto por célula:

```html
<!-- sem nenhum [formGroup] ou formArrayName no container externo -->
<div [formGroup]="getLinha(linha.index)">
  <input formControlName="data" />
  <input formControlName="campo" />
</div>
```

**Comparação direta:**

| Aspecto              | v1 — FormGroup wrapper            | v2 — FormArray direto        |
|----------------------|-----------------------------------|------------------------------|
| `@Input`             | `FormGroup { linhas: FormArray }` | `FormArray`                  |
| Níveis no template   | 3 (`formGroup` → `formArrayName` → `formGroupName`) | 1 (`[formGroup]`) |
| Acesso ao array no TS | `this.formGroup.get('linhas') as FormArray` | `this.linhas` diretamente |
| Contrato com o pai   | Precisa conhecer o nome `"linhas"` | Explícito: passa o array     |
| Quando usar          | Quando o filho precisa de mais de um `FormArray` ou campos soltos junto | Quando o componente é exclusivamente uma lista de linhas |

---

## Dados externos via `@Input`

Ambas as versões recebem os dados da tabela via `@Input() dados: DadoLinha[]`. O componente **não possui dados próprios** — apenas cria os controles reativos a partir do que recebe.

```ts
// No componente (v1 e v2, idêntico)
ngOnInit(): void {
  this.dados.forEach((dado) => this.linhasArray.push(this.novaLinha(dado)));
  this.atualizarDataSource();
}

private novaLinha(dado: Partial<DadoLinha> = {}): FormGroup {
  return this.fb.group({
    data:  [dado.data  ?? null, Validators.required],  // inicializado com o valor externo
    campo: [dado.campo ?? '',   Validators.required],  // inicializado com o valor externo
  });
}
```

O pai define e passa os dados iniciais:

```ts
// formulario-principal.component.ts
readonly dadosTabela: DadoLinha[] = [
  { data: new Date('2024-01-15'), campo: 'Item inicial A', categoria: 'Categoria A', status: 'Ativo' },
  { data: new Date('2024-03-22'), campo: 'Item inicial B', categoria: 'Categoria B', status: 'Inativo' },
  { data: null,                   campo: 'Item inicial C', categoria: 'Categoria C', status: 'Pendente' },
];
```

As colunas `categoria` e `status` ficam **apenas no dataSource** da tabela, fora do `FormGroup`. No submit do formulário, somente `data` e `campo` de cada linha são enviados.

---

## Model compartilhado

`src/app/models/linha-tabela.model.ts`

```ts
export interface DadoLinha {
  data: Date | null;   // campo do formulário
  campo: string;       // campo do formulário
  categoria: string;   // somente visualização
  status: string;      // somente visualização
}

/** Adiciona `index` para uso interno como datasource da mat-table. */
export interface LinhaTabela extends DadoLinha {
  index: number;
}
```

O `index` é necessário porque o `mat-table` itera sobre o `dataSource`, que é independente do `FormArray`. O índice é a "ponte" entre o objeto renderizado em cada linha da tabela e o `FormGroup` correspondente no array reativo.

