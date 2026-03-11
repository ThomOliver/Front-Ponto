type FieldValue = string | number | Date | boolean | undefined | null;

export type Field<T extends FieldValue = FieldValue> = {
  /** 
   * Rótulo do campo 
   * Exemplo: "Nome", "Descrição", "Ativo"
   */
  label: string;

  /** 
   * Tipo do campo que vai ser renderizado 
   * - text → <input type="text">
   * - number → <input type="number">
   * - date → <input type="date">
   * - select → <select>
   * - toggle → switch/checkbox
   */
  type: 'text' | 'number' | 'date' | 'time' | 'textarea' | 'toggle';

  /**
   * Valor do campo
   * Pode ser string, number, boolean ou até Date
   */
  value: T;

  /** 
   * Função para atualizar o valor quando o usuário digitar/selecionar algo 
   */
  onChange: (value: T) => void;

  /**
   * Usado apenas se o tipo for "select"
   * Exemplo: [{ value: "admin", label: "Administrador" }]
   */
  options?: { value: string; label: string }[];
  disabled?: boolean;
};
