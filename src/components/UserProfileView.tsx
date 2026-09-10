import React, { useState } from 'react';
import {
  User,
  Users,
  ShieldCheck,
  MapPin,
  Calendar,
  Award,
  Globe,
  Heart,
  BookOpen,
  Share2,
  Edit3,
  CheckCircle2,
  Download,
  Plus,
  Compass,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Leaf,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  Cpu,
  Clock,
  Check,
  Eye,
  Lock,
  FileText,
  Camera,
  Layers,
  Activity,
  Sliders,
} from 'lucide-react';
import { BreadcrumbItem } from './Topbar';

export interface UserProfileViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export type ProfileTabId =
  | 'publico'
  | 'identidade'
  | 'territorios'
  | 'interesses'
  | 'comunidades'
  | 'projetos'
  | 'diario'
  | 'privacidade';

interface ProfileTabMeta {
  id: ProfileTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const PROFILE_TABS: ProfileTabMeta[] = [
  { id: 'publico', label: 'Perfil Público', icon: User, description: 'Visão pública da cidadã ativa, conquistas e reputação.' },
  { id: 'identidade', label: 'Identidade & Bio', icon: FileText, description: 'Dados biográficos, formação e competências cívicas.' },
  { id: 'territorios', label: 'Territórios & Vilas', icon: MapPin, description: 'Locais de residência, vilas conectadas e afinidades regionais.' },
  { id: 'interesses', label: 'Interesses & Causas', icon: Heart, description: 'Causas globais prioritárias, ODS e competências.' },
  { id: 'comunidades', label: 'Minhas Comunidades', icon: Globe, description: 'Grupos e aldeias onde atua como membro ou moderadora.' },
  { id: 'projetos', label: 'Projetos & Iniciativas', icon: Rocket, description: 'Iniciativas criadas, co-lideradas e metas de impacto.' },
  { id: 'diario', label: 'Diário de Impacto', icon: Activity, description: 'Histórico auditado de ações, voluntariado e certificados.' },
  { id: 'privacidade', label: 'Privacidade & Dados', icon: Lock, description: 'Controlo de visibilidade e privacidade cívica.' },
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onBreadcrumbChange,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('publico');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable state (Cidadã Ativa persona: Ana Silva)
  const [name, setName] = useState('Ana Silva');
  const [pronouns, setPronouns] = useState('Ela / Dela');
  const [headline, setHeadline] = useState('Bióloga Marinha & Ativista Comunitária • Guardiã da Ria Formosa');
  const [bio, setBio] = useState(
    'Dedicada à conservação marinha costeira, educação ambiental em escolas públicas e fortalecimento de redes comunitárias no sul de Portugal e espaço lusófono.'
  );
  const [location, setLocation] = useState('Faro, Algarve, Portugal');
  const [email, setEmail] = useState('ana.silva@vilaglobal.org');
  const [primaryTerritory, setPrimaryTerritory] = useState('Faro, Portugal');
  const [connectedTerritories, setConnectedTerritories] = useState([
    'Ria Formosa (Algarve)',
    'Mindelo (São Vicente, Cabo Verde)',
    'Ilha do Príncipe (São Tomé e Príncipe)',
  ]);
  const [newTerritoryInput, setNewTerritoryInput] = useState('');

  // Privacy toggles
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showImpactStats, setShowImpactStats] = useState(true);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);

  const onBreadcrumbChangeRef = React.useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  React.useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Perfil' },
      { label: PROFILE_TABS.find((t) => t.id === activeTab)?.label || 'Visão Geral' },
    ]);
  }, [activeTab]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddTerritory = () => {
    if (!newTerritoryInput.trim()) return;
    setConnectedTerritories((prev) => [...prev, newTerritoryInput.trim()]);
    setNewTerritoryInput('');
  };

  const handleRemoveTerritory = (indexToRemove: number) => {
    setConnectedTerritories((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0F1E3D] pb-16">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 space-y-6">

        {/* Notificação Toast */}
        {saveSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-600 animate-in fade-in slide-in-from-bottom-3">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="text-xs sm:text-sm font-semibold">Perfil atualizado com sucesso!</span>
          </div>
        )}

        {/* Perfil Header Card: Capa + Avatar + Identidade Rápida */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
          {/* Capa */}
          <div className="relative h-44 sm:h-56 w-full bg-gradient-to-r from-[#0F1E3D] via-[#1E3A8A] to-[#10B981] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&auto=format&fit=crop&q=80"
              alt="Capa do Perfil"
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Cidadã Ativa Verificada</span>
              </span>
            </div>
          </div>

          {/* Dados do Usuário & Ações */}
          <div className="px-5 sm:px-8 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                {/* Avatar */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden ring-4 ring-white shadow-lg bg-slate-100 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#10B981] border-2 border-white rounded-full" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-[#0F1E3D] font-['Outfit']">
                      {name}
                    </h1>
                    <span className="text-xs text-slate-400 font-medium">({pronouns})</span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                      Nível 4 • Embaixadora
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {headline}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Membro desde Março de 2024
                    </span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('identidade')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Editar Perfil</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-xs font-bold text-white transition-colors shadow-2xs cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-300" />
                  <span>Partilhar</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics da Cidadã Ativa */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
              <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500">Horas de Voluntariado</span>
                <p className="text-lg sm:text-xl font-black text-[#0F1E3D] font-['Outfit']">142 h</p>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500">Comunidades Ativas</span>
                <p className="text-lg sm:text-xl font-black text-[#0F1E3D] font-['Outfit']">8 grupos</p>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500">Iniciativas Co-criadas</span>
                <p className="text-lg sm:text-xl font-black text-[#0F1E3D] font-['Outfit']">5 projetos</p>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500">Medalhas Cívicas</span>
                <p className="text-lg sm:text-xl font-black text-emerald-600 font-['Outfit']">12 conquistas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Navegação dos 8 Ecrãs do Perfil */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-2xs overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            {PROFILE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F1E3D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo Dinâmico por Ecrã */}
        <div className="space-y-6">

          {/* ECRÃ 1: Perfil Público */}
          {activeTab === 'publico' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Coluna Esquerda: Bio e Atividades Recentes (8 colunas) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
                  <h3 className="text-sm font-bold text-[#0F1E3D] font-['Outfit']">Sobre Mim</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{bio}</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-[#0F1E3D] font-['Outfit']">Conquistas & Distinções Cívicas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950">Guardiã do Oceano</h4>
                        <p className="text-[10px] text-emerald-800">Mais de 50h em conservação de bacias costeiras.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-blue-950">Mentora Cívica</h4>
                        <p className="text-[10px] text-blue-800">12 oficinas comunitárias facilitadas com jovens.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-purple-950">Pioneira VILA</h4>
                        <p className="text-[10px] text-purple-800">Membro fundadora dos primeiros círculos locais.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-[#0F1E3D] font-['Outfit']">Atividade Cívica Recente</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#0F1E3D]">
                          Concluiu a ação de campo <span className="font-bold">"Limpeza e Amostragem de Microplásticos na Ilha Deserta"</span>
                        </p>
                        <p className="text-[10px] text-slate-400">Ontem às 16:40 • 4 horas de voluntariado validadas</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#0F1E3D]">
                          Publicou a proposta <span className="font-bold">"Guia de Compostagem para Condomínios e Aldeias"</span>
                        </p>
                        <p className="text-[10px] text-slate-400">Há 3 dias • Comunidade Ambiente & Sustentabilidade</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#0F1E3D]">
                          Foi nomeada <span className="font-bold">Co-moderadora</span> do Hub Regional Algarve Sustentável
                        </p>
                        <p className="text-[10px] text-slate-400">Há 1 semana • 1.420 membros</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Territórios e Causas Resumo (4 colunas) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Território Principal</h3>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0F1E3D]">{primaryTerritory}</h4>
                      <p className="text-[10px] text-slate-500">Zona Costeira e Parque Natural da Ria Formosa</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Causas com Maior Engajamento</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-emerald-50 text-emerald-900 font-semibold">
                      <span className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-600" />
                        Ambiente & Oceanos
                      </span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold">Líder</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-blue-50 text-blue-900 font-semibold">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        Educação Comunitária
                      </span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold">Ativa</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-indigo-50 text-indigo-900 font-semibold">
                      <span className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-indigo-600" />
                        Tecnologia & Ciência Aberta
                      </span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold">Colaboradora</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ECRÃ 2: Identidade & Bio */}
          {activeTab === 'identidade' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs max-w-4xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Identidade & Biografia Cívica</h3>
                <p className="text-xs text-slate-500">Mantenha os seus dados biográficos e competências atualizados</p>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E3D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pronomes</label>
                    <input
                      type="text"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E3D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Frase de Apresentação / Headline *</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Biografia Cívica & Trajetória</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E3D] leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Localização Residencial</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E3D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Institucional / de Contato</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E3D]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Guardar Alterações
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ECRÃ 3: Territórios & Vilas */}
          {activeTab === 'territorios' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs max-w-4xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Territórios & Vilas Conectadas</h3>
                <p className="text-xs text-slate-500">Defina os territórios com os quais mantém laços cívicos, ancestrais ou operacionais</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Território de Residência Principal</label>
                  <input
                    type="text"
                    value={primaryTerritory}
                    onChange={(e) => setPrimaryTerritory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">Vilas & Comunidades Territoriais de Afinidade</label>
                  <div className="space-y-2">
                    {connectedTerritories.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-[#0F1E3D]">{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveTerritory(idx)}
                          className="text-[11px] font-bold text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={newTerritoryInput}
                      onChange={(e) => setNewTerritoryInput(e.target.value)}
                      placeholder="Adicionar outro território ou vila..."
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleAddTerritory}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ECRÃ 4: Interesses & Causas */}
          {activeTab === 'interesses' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs max-w-4xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Interesses & Causas Prioritárias</h3>
                <p className="text-xs text-slate-500">Mapeamento das 7 causas globais e alinhamento com a Agenda 2030</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Ambiente & Biodiversidade', icon: Leaf, level: 'Muito Alto', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
                  { name: 'Educação Cívica & Inclusão', icon: GraduationCap, level: 'Alto', color: 'bg-blue-50 text-blue-900 border-blue-200' },
                  { name: 'Direitos Humanos & Equidade', icon: Scale, level: 'Médio', color: 'bg-purple-50 text-purple-900 border-purple-200' },
                  { name: 'Cultura & Patrimônio', icon: Palette, level: 'Alto', color: 'bg-amber-50 text-amber-900 border-amber-200' },
                  { name: 'Saúde & Bem-estar Coletivo', icon: HeartPulse, level: 'Médio', color: 'bg-rose-50 text-rose-900 border-rose-200' },
                  { name: 'Tecnologia Aberta & Cívica', icon: Cpu, level: 'Alto', color: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
                  { name: 'Empreendedorismo Regenerativo', icon: Rocket, level: 'Médio', color: 'bg-orange-50 text-orange-900 border-orange-200' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between ${item.color}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white shadow-2xs">
                        {item.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ECRÃ 5: Minhas Comunidades */}
          {activeTab === 'comunidades' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Comunidades Participantes (8)</h3>
                  <p className="text-xs text-slate-500">Grupos onde a Ana atua ativamente como membro ou moderadora</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.('comunidade')}
                  className="px-4 py-2 bg-[#0F1E3D] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Explorar Mais Comunidades
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Guardiões do Oceano Atlântico', role: 'Co-moderadora', members: '14.280', cat: 'Ambiente', bg: 'bg-emerald-600' },
                  { name: 'Educação sem Fronteiras', role: 'Membro Ativo', members: '8.430', cat: 'Educação', bg: 'bg-blue-600' },
                  { name: 'Tecnologia Aberta & IA Ética', role: 'Colaboradora', members: '12.100', cat: 'Tecnologia', bg: 'bg-indigo-600' },
                  { name: 'Aldeias Sustentáveis de Portugal', role: 'Membro', members: '4.910', cat: 'Ambiente', bg: 'bg-teal-600' },
                ].map((comm, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {comm.cat}
                      </span>
                      <h4 className="text-xs font-bold text-[#0F1E3D] mt-2 line-clamp-1">{comm.name}</h4>
                      <p className="text-[10px] text-slate-500">{comm.members} cidadãos conectados</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-emerald-700">{comm.role}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ECRÃ 6: Projetos & Iniciativas */}
          {activeTab === 'projetos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Iniciativas Lideradas ou Apoiadas</h3>
                  <p className="text-xs text-slate-500">Projetos com metas ativas de impacto territorial</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Limpeza Costeira & Censo de Aves da Ria Formosa',
                    status: 'Em andamento',
                    progress: 92,
                    volunteers: 320,
                    goal: '350 voluntários',
                  },
                  {
                    title: 'Hortas Pedagógicas em Escolas Rurais',
                    status: 'Concluído com Sucesso',
                    progress: 100,
                    volunteers: 180,
                    goal: '180 voluntários',
                  },
                  {
                    title: 'Rede de Monitorização Comunitária da Água',
                    status: 'Fase de Captação',
                    progress: 65,
                    volunteers: 95,
                    goal: '150 voluntários',
                  },
                ].map((proj, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {proj.status}
                    </span>
                    <h4 className="text-xs font-bold text-[#0F1E3D] line-clamp-2">{proj.title}</h4>
                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">Meta de engajamento</span>
                        <span className="font-bold text-emerald-700">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${proj.progress}%` }} />
                      </div>
                      <p className="text-[10px] text-slate-400 text-right">{proj.volunteers} de {proj.goal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ECRÃ 7: Diário de Impacto */}
          {activeTab === 'diario' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Diário de Impacto Cívico</h3>
                  <p className="text-xs text-slate-500">Histórico de participações, validações de presença e auditoria comunitária</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Certificado de Voluntariado gerado em PDF.')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descarregar Certificado</span>
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { date: '08 de Março, 2026', hours: '4 horas', event: 'Oficina de Cidadania e Compostagem Urbana', validator: 'Comunidade Faro Sustentável' },
                  { date: '22 de Fevereiro, 2026', hours: '6 horas', event: 'Mutirão de Plantio de Árvores Nativas', validator: 'Associação Guardiões Ibéricos' },
                  { date: '15 de Janeiro, 2026', hours: '3 horas', event: 'Webinar Internacional: Mulheres no Clima', validator: 'VILA Global Hub' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#0F1E3D]">{item.event}</p>
                      <p className="text-[11px] text-slate-400">{item.date} • Validado por {item.validator}</p>
                    </div>
                    <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      +{item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ECRÃ 8: Privacidade & Dados */}
          {activeTab === 'privacidade' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs max-w-4xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#0F1E3D] font-['Outfit']">Privacidade & Controlo de Dados</h3>
                <p className="text-xs text-slate-500">Defina com quem partilha os seus dados de atuação cívica e geolocalização</p>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-[#0F1E3D]">Perfil Público Aberto</h4>
                    <p className="text-[11px] text-slate-500">Permite que outros cidadãos e líderes de comunidades vejam o seu perfil.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isProfilePublic}
                    onChange={(e) => setIsProfilePublic(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-[#0F1E3D]">Exibir Localização no Mapa</h4>
                    <p className="text-[11px] text-slate-500">Apenas a cidade e país são visíveis, nunca o endereço exato.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showLocation}
                    onChange={(e) => setShowLocation(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-[#0F1E3D]">Métricas de Impacto Públicas</h4>
                    <p className="text-[11px] text-slate-500">Exibir total de horas de voluntariado e árvores plantadas no passaporte cívico.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showImpactStats}
                    onChange={(e) => setShowImpactStats(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
