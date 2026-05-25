export interface DadoLinha {
  data: Date | null;
  campo: string;
  categoria: string;
  status: string;
}

/** Versão interna usada como datasource da tabela Material, com índice para o FormArray. */
export interface LinhaTabela extends DadoLinha {
  index: number;
}
