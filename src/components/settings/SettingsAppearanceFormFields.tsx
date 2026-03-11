import React from 'react';
import { CrudDynamicForm  } from '@/components/CrudDynamicForm';

interface SettingsProfileHandlers {
  colorPrimary: string; setColorPrimary: (v: string) => void;
  colorPrimaryDark: string; setColorPrimaryDark: (v: string) => void;
  colorSecondary: string; setColorSecondary: (v: string) => void;
  colorSecondaryDark: string; setColorSecondaryDark: (v: string) => void;
  colorText: string; setColorText: (v: string) => void;
  colorTextDark: string; setColorTextDark: (v: string) => void;
  colorBg: string; setColorBg: (v: string) => void;
  colorBgDark: string; setColorBgDark: (v: string) => void;
  colorBgLight: string; setColorBgLight: (v: string) => void;
  colorBgLightDark: string; setColorBgLightDark: (v: string) => void;
  userDash: boolean; setUserDash: (v: boolean) => void;
  category: boolean; setCategory: (v: boolean) => void;
  artwork: boolean; setArtwork: (v: boolean) => void;
  exhibition: boolean; setExhibition: (v: boolean) => void;
  graphic: boolean; setGraphic: (v: boolean) => void;
  setting: boolean; setSetting: (v: boolean) => void;
  dashboard: boolean; setDashboard: (v: boolean) => void;
  
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const SettingsAppearanceFormFields: React.FC<SettingsProfileHandlers> = (props) => {

  const handleStringChange = (setter: (v: string) => void) => (v: string | number | boolean) => {
    setter(String(v || ''));
  };

  return (
    <CrudDynamicForm
      fields={[
        { label: "Cor Primária", type: "text", value: props.colorPrimary, onChange: (v) => props.setColorPrimary(String(v)) },
        { label: "Cor Primária Escura", type: "text", value: props.colorPrimaryDark, onChange: (v) => props.setColorPrimaryDark(String(v)) },
        { label: "Cor Secundária", type: "text", value: props.colorSecondary, onChange: (v) => props.setColorSecondary(String(v)) },
        { label: "Cor Secundária Escura", type: "text", value: props.colorSecondaryDark, onChange: (v) => props.setColorSecondaryDark(String(v)) },
        { label: "Cor Texto", type: "text", value: props.colorText, onChange: (v) => props.setColorText(String(v)) },
        { label: "Cor Texto Escura", type: "text", value: props.colorTextDark, onChange: (v) => props.setColorTextDark(String(v)) },
        { label: "Cor de fundo", type: "text", value: props.colorBg, onChange: (v) => props.setColorBg(String(v)) },
        { label: "Cor de fundo escura", type: "text", value: props.colorBgDark, onChange: (v) => props.setColorBgDark(String(v)) },
        { label: "Cor de fundo clara", type: "text", value: props.colorBgLight, onChange: (v) => props.setColorBgLight(String(v)) },
        { label: "Cor de fundo clara escura", type: "text", value: props.colorBgLightDark, onChange: (v) => props.setColorBgLightDark(String(v)) },
        { label: "Dashboard Usuário", type: "toggle", value: props.userDash, onChange: (v) => props.setUserDash(Boolean(v)) },
        { label: "Dashboard Categoria", type: "toggle", value: props.category, onChange: (v) => props.setCategory(Boolean(v)) },
        { label: "Dashboard Obra", type: "toggle", value: props.artwork, onChange: (v) => props.setArtwork(Boolean(v)) },
        { label: "Dashboard Exposição", type: "toggle", value: props.exhibition, onChange: (v) => props.setExhibition(Boolean(v)) },
        { label: "Dashboard Gráfico", type: "toggle", value: props.graphic, onChange: (v) => props.setGraphic(Boolean(v)) },
        { label: "Dashboard Configuração", type: "toggle", value: props.setting, onChange: (v) => props.setSetting(Boolean(v)) },
        { label: "Dashboard", type: "toggle", value: props.dashboard, onChange: (v) => props.setDashboard(Boolean(v)) },
      ]}

      onSubmit={props.onSubmit}
      submitLabel="Salvar Alterações"
      loading={props.loading}
    />
  );
};