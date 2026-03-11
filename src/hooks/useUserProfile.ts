import { useEffect, useState } from "react";
import api from "@/services/axios";
import { useAuthStore } from "@/store/authStore";
import { useImageStore } from "@/store/useImageStore";

export function useUserProfile() {
  const { token } = useAuthStore();
  const { imageUrl, setImageUrl } = useImageStore();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [xtwitter, setXtwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [bio, setBio] = useState('');
  const [bioEn, setBioEn] = useState('');
  const [bioEs, setBioEs] = useState('');
  const [bioCn, setBioCn] = useState('');
  const [largeBio, setLargeBio] = useState('');
  const [largeBioEn, setLargeBioEn] = useState('');
  const [largeBioEs, setLargeBioEs] = useState('');
  const [largeBioCn, setLargeBioCn] = useState('');
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState('');
  const [profilePic, setProfilePic] = useState('');


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLinkedin(res.data.linkedin || '');
        setXtwitter(res.data.xtwitter || '');
        setFacebook(res.data.facebook || '');
        setInstagram(res.data.instagram || '');
        setTiktok(res.data.tiktok || '');
        setName(res.data.name || '');
        setBio(res.data.bio || '');
        setBioEn(res.data.bioEn || '');
        setBioEs(res.data.bioEs || '');
        setBioCn(res.data.bioCn || '');
        setLargeBio(res.data.largeBio || '');
        setLargeBioEn(res.data.largeBioEn || '');
        setLargeBioEs(res.data.largeBioEs || '');
        setLargeBioCn(res.data.largeBioCn || '');
        setImageUrl(res.data.profilePic || '');
        setSlug(res.data.slug || '');
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      }
    };

    fetchUser();
  }, [token, setImageUrl]);

  const updateProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await api.patch(
        '/users/me',
        { name, bio, bioEn, bioEs, bioCn, largeBio, largeBioEn, largeBioEs, largeBioCn, linkedin, xtwitter, facebook, instagram, tiktok, profilePic: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      alert('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return {
    linkedin, 
    setLinkedin,
    xtwitter, 
    setXtwitter,
    facebook, 
    setFacebook,
    instagram, 
    setInstagram,
    tiktok, 
    setTiktok,
    name,
    setName,
    bio,
    setBio,
    bioEn,
    setBioEn,
    bioEs,
    setBioEs,
    bioCn,
    setBioCn,
    largeBio,
    setLargeBio,
    largeBioEn,
    setLargeBioEn,
    largeBioEs,
    setLargeBioEs,
    largeBioCn,
    setLargeBioCn,
    loading,
    updateProfile,
    logo,
    setLogo,
    profilePic,
    setProfilePic,
    slug
  };
}
