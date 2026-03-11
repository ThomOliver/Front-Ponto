import React from 'react';
import { CrudDynamicForm } from '@/components/CrudDynamicForm';

interface UserProfileHandlers {
  name: string; setName: (v: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const UserProfileFormFields: React.FC<UserProfileHandlers> = (props) => {

  return (
    <CrudDynamicForm
      fields={[
        { label: 'Nome', type: 'text', value: props.name, onChange: (v) => props.setName(String(v)) },
      ]}
      onSubmit={props.onSubmit}
      submitLabel="Salvar Alterações"
      loading={props.loading}
    />
  );
};