import { useEffect, useState } from "react";
import api from "@/services/axios";
import { useAuthStore } from "@/store/authStore";

export function useSettingsProfile() {
  const { token } = useAuthStore();
  const [logo, setLogo] = useState('');
  const [colorPrimary, setColorPrimary] = useState('');
  const [colorPrimaryDark, setColorPrimaryDark] = useState('');
  const [colorSecondary, setColorSecondary] = useState('');
  const [colorSecondaryDark, setColorSecondaryDark] = useState('');
  const [colorText, setColorText] = useState('');
  const [colorTextDark, setColorTextDark] = useState('');
  const [colorBg, setColorBg] = useState('');
  const [colorBgDark, setColorBgDark] = useState('');
  const [colorBgLight, setColorBgLight] = useState('');
  const [colorBgLightDark, setColorBgLightDark] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDash, setUserDash] = useState(true)
  const [artwork, setArtwork] = useState(true)
  const [category, setCategory] = useState(true)
  const [exhibition, setExhibition] = useState(true)
  const [graphic, setGraphic] = useState(true)
  const [setting, setSetting] = useState(true) 
  const [dashboard, setDashboard] = useState(true) 
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await api.get('/settings/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogo(res.data.logo || '');   
        setColorPrimary(res.data.colorPrimary || '');
        setColorPrimaryDark(res.data.colorPrimaryDark || '');
        setColorSecondary(res.data.colorSecondary || '');
        setColorSecondaryDark(res.data.colorSecondaryDark || '');
        setColorText(res.data.colorText || '');
        setColorTextDark(res.data.colorTextDark || '');
        setColorBg(res.data.colorBg || '');
        setColorBgDark(res.data.colorBgDark || '');
        setColorBgLight(res.data.colorBgLight || '');
        setColorBgLightDark(res.data.colorBgLightDark || '');
        setUserDash(Boolean(res.data.userDash));
        setCategory(Boolean(res.data.category));
        setArtwork(Boolean(res.data.artwork));
        setExhibition(Boolean(res.data.exhibition));
        setGraphic(Boolean(res.data.graphic));
        setSetting(Boolean(res.data.setting));
        setDashboard(Boolean(res.data.dashboard));

      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      }
    };

    fetchUser();
  }, [token]);

  const updateProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await api.patch(
        '/settings/me',
        { 
          logo, 
          colorPrimary,
          colorPrimaryDark,
          colorSecondary,
          colorSecondaryDark,
          colorText, 
          colorTextDark,
          colorBg, 
          colorBgDark, 
          colorBgLight, 
          colorBgLightDark,
          userDash,
          category,
          artwork,
          exhibition,
          graphic,
          setting,
          dashboard
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Configurações atualizadas com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar configurações:', err);
      alert('Erro ao atualizar configurações.');
    } finally {
      setLoading(false);
    }
  };

    const updateSectionVisibility = async (sectionKey: string, value: boolean) => {
    if (!token) return;

    // Mapa entre o id da seção e o campo correspondente na API
    const sectionMap: Record<string, string> = {
      profile: "userDash",
      settings: "setting",
      kpi: "category",
      charts: "graphic",
      latest: "artwork",
      exhibitions: "exhibition",
    };

    const field = sectionMap[sectionKey];
    if (!field) {
      console.warn(`⚠️ Nenhum campo correspondente encontrado para: ${sectionKey}`);
      return;
    }

    try {
      await api.patch(
        "/settings/me",
        { [field]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`✅ ${field} atualizado para ${value}`);
    } catch (err) {
      console.error(`❌ Erro ao atualizar ${field}:`, err);
    }
  };

  return {
    loading,
    updateProfile,
    logo,
    setLogo,
    colorPrimary,
    setColorPrimary,
    colorPrimaryDark,
    setColorPrimaryDark,
    colorSecondary,
    setColorSecondary,
    colorSecondaryDark,
    setColorSecondaryDark,
    colorText,
    setColorText,
    colorTextDark,
    setColorTextDark,
    colorBg,
    setColorBg,
    colorBgDark,
    setColorBgDark,
    colorBgLight,
    setColorBgLight,
    colorBgLightDark,
    setColorBgLightDark,
    userDash,
    setUserDash,
    artwork,
    setArtwork,
    exhibition,
    setExhibition,
    graphic,
    setGraphic,
    category,
    setCategory,
    setting,
    setSetting,
    dashboard,
    setDashboard,
    updateSectionVisibility       
  };
}
