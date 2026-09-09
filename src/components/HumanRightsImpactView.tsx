import React, { useState } from 'react';
import {
  Scale,
  Users,
  Globe,
  Heart,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  X,
  Compass,
  Leaf,
  Zap,
  GraduationCap,
  Activity,
  Rocket,
  Palette,
  MoreHorizontal,
  Megaphone,
  Gavel,
  HeartHandshake,
  ShieldCheck,
  BookOpen,
  Database,
  Coins,
  Video,
  FileText,
} from 'lucide-react';

export interface HumanRightsImpactViewProps {
  onOpenAiAssistant?: () => void;
  onExploreWorld?: () => void;
  onExploreCommunity?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
}

interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  location: string;
  description: string;
  impactPeople: string;
  progressPercent: number;
  imageUrl: string;
}

export const HumanRightsImpactView: React.FC<HumanRightsImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = () => {},
  onNavigateToCategory,
}) => {
  const [activeCategory] = useState<string>('direitos');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [supportSuccessToast, setSupportSuccessToast] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);

  const showToast = (msg: string) => {
    setSupportSuccessToast(msg);
    setTimeout(() => setSupportSuccessToast(null), 3000);
  };

  // Ribbon de Métricas do Topo
  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '1.124', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Organizações', value: '276', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Países', value: '98', icon: <Globe className="w-4 h-4 text-slate-500" /> },
    { label: 'Pessoas Impactadas', value: '4.875.320', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Campanhas Ativas', value: '214', icon: <Megaphone className="w-4 h-4 text-slate-500" /> },
    { label: 'Pessoas Apoiadas', value: '783.650', icon: <HeartHandshake className="w-4 h-4 text-slate-500" /> },
    { label: 'Horas de Voluntariado', value: '2.143.480 h', icon: <Heart className="w-4 h-4 text-slate-500" /> },
  ];

  // Fita de Categorias
  const categories = [
    { id: 'todas', label: 'Todas', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'ambiente', label: 'Ambiente', icon: <Leaf className="w-3.5 h-3.5" /> },
    { id: 'tecnologia', label: 'Tecnologia', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'educacao', label: 'Educação', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'direitos', label: 'Direitos Humanos', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'saude', label: 'Saúde', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'empreendedorismo', label: 'Empreendedorismo', icon: <Rocket className="w-3.5 h-3.5" /> },
    { id: 'cultura', label: 'Cultura', icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  // 6 Áreas de Impacto em Direitos Humanos
  const impactAreas = [
    {
      id: 'igualdade',
      title: 'Igualdade e Não Discriminação',
      description: 'Promover igualdade de oportunidades para todos.',
      initiativesCount: '189 iniciativas',
      icon: <Users className="w-5 h-5 text-violet-600" />,
      iconBg: 'bg-violet-50 border-violet-100',
      badgeColor: 'text-violet-700',
    },
    {
      id: 'liberdade',
      title: 'Liberdade de Expressão',
      description: 'Defender o direito de expressar ideias e opiniões.',
      initiativesCount: '142 iniciativas',
      icon: <Megaphone className="w-5 h-5 text-rose-600" />,
      iconBg: 'bg-rose-50 border-rose-100',
      badgeColor: 'text-rose-700',
    },
    {
      id: 'criancas',
      title: 'Direitos das Crianças',
      description: 'Proteger e promover os direitos de todas as crianças.',
      initiativesCount: '161 iniciativas',
      icon: <Heart className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-100',
      badgeColor: 'text-blue-700',
    },
    {
      id: 'justica',
      title: 'Justiça e Estado de Direito',
      description: 'Garantir acesso à justiça e processos justos para todos.',
      initiativesCount: '161 iniciativas',
      icon: <Gavel className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-100',
      badgeColor: 'text-emerald-700',
    },
    {
      id: 'mulheres',
      title: 'Direitos das Mulheres',
      description: 'Promover igualdade de género e combater a violência.',
      initiativesCount: '128 iniciativas',
      icon: <HeartHandshake className="w-5 h-5 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-100',
      badgeColor: 'text-amber-700',
    },
    {
      id: 'vulneraveis',
      title: 'Direitos de Grupos Vulneráveis',
      description: 'Apoiar refugiados, minorias e populações vulneráveis.',
      initiativesCount: '134 iniciativas',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
      iconBg: 'bg-teal-50 border-teal-100',
      badgeColor: 'text-teal-700',
    },
  ];

  // Projetos em Destaque
  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Igualdade',
      title: 'Juventude Sem Discriminação',
      location: 'Global',
      description: 'Promovendo inclusão e igualdade para jovens em comunidades.',
      impactPeople: '210K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      tag: 'Liberdade',
      title: 'Vozes Livres',
      location: 'Brasil',
      description: 'Defendendo a liberdade de expressão e o jornalismo independente.',
      impactPeople: '95K pessoas',
      progressPercent: 72,
      imageUrl: 'https://images.unsplash.com/photo-1591189824344-e0e0c8a5db77?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      tag: 'Crianças',
      title: 'Infância Protegida',
      location: 'Moçambique',
      description: 'Proteção de crianças contra trabalho infantil e abuso.',
      impactPeople: '112K pessoas',
      progressPercent: 68,
      imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      tag: 'Justiça',
      title: 'Justiça para Todos',
      location: 'Índia',
      description: 'Acesso à justiça gratuita para comunidades marginalizadas.',
      impactPeople: '88K pessoas',
      progressPercent: 75,
      imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=700&auto=format&fit=crop&q=80',
    },
  ];

  // O impacto em números
  const impactCards = [
    { id: 'num1', value: '4.875.320', label: 'Pessoas Impactadas', change: '12,4% este mês', sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95] },
    { id: 'num2', value: '276', label: 'Organizações Parceiras', change: '8,7% este mês', sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92] },
    { id: 'num3', value: '214', label: 'Campanhas Ativas', change: '15,3% este mês', sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98] },
    { id: 'num4', value: '783.650', label: 'Pessoas Apoiadas', change: '11,6% este mês', sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91] },
    { id: 'num5', value: '2.143.480 h', label: 'Horas de Voluntariado', change: '14,2% este mês', sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94] },
    { id: 'num6', value: '98', label: 'Países', change: '6,3% este mês', sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96] },
  ];

  // Mais Populares em Direitos Humanos
  const popularInitiatives = [
    { id: 'pop1', rank: 1, title: 'Igualdade e Não Discriminação', supporters: '215K apoiadores', growth: '24%' },
    { id: 'pop2', rank: 2, title: 'Liberdade de Expressão', supporters: '162K apoiadores', growth: '18%' },
    { id: 'pop3', rank: 3, title: 'Direitos das Crianças', supporters: '128K apoiadores', growth: '16%' },
    { id: 'pop4', rank: 4, title: 'Acesso à Justiça', supporters: '98K apoiadores', growth: '15%' },
    { id: 'pop5', rank: 5, title: 'Direitos das Mulheres', supporters: '67K apoiadores', growth: '12%' },
  ];

  // Recursos e Ferramentas
  const toolsAndResources = [
    { id: 'guia', title: 'Guia de Direitos Humanos', description: 'Aprenda sobre direitos fundamentais', icon: <BookOpen className="w-4 h-4 text-violet-600" />, bg: 'bg-violet-50 border-violet-100' },
    { id: 'monitor', title: 'Ferramenta de Monitorização', description: 'Acompanhe violações e alertas', icon: <ShieldCheck className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 border-rose-100' },
    { id: 'base', title: 'Base de Dados de Organizações', description: 'Encontre ONGs e defensores', icon: <Database className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50 border-blue-100' },
    { id: 'financiamento', title: 'Financiamento e Doações', description: 'Apoie causas de direitos humanos', icon: <Coins className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-100' },
    { id: 'cursos', title: 'Cursos e Capacitações', description: 'Formação em direitos humanos', icon: <GraduationCap className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 border-amber-100' },
    { id: 'webinars', title: 'Webinars e Debates', description: 'Participe de eventos e discussões', icon: <Video className="w-4 h-4 text-cyan-600" />, bg: 'bg-cyan-50 border-cyan-100' },
    { id: 'documentos', title: 'Documentos e Relatórios', description: 'Acesse estudos e relatórios globais', icon: <FileText className="w-4 h-4 text-slate-600" />, bg: 'bg-slate-50 border-slate-200' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 antialiased text-[#1E293B]">
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#312E81] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-violet-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-violet-300" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* TÍTULO + BOTÃO APOIAR INICIATIVA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#312E81] flex items-center justify-center shrink-0 shadow-sm">
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                Direitos Humanos
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Dignidade, igualdade e justiça para todas as pessoas, em todos os lugares.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer group"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className="w-4 h-4 text-violet-200 group-hover:fill-current group-hover:text-rose-400 transition-colors" />
          </button>
        </div>

        {/* STATS RIBBON */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-2xs overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] divide-x divide-slate-100">
            {ribbonMetrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2.5 px-3 first:pl-1 last:pr-1 flex-1">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  {m.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-black text-[#0F1E3D] font-['Outfit'] tracking-tight truncate">
                    {m.value}
                  </div>
                  <div className="text-[10.5px] text-slate-500 font-medium truncate">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTER RIBBON */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onNavigateToCategory) {
                    onNavigateToCategory(cat.id === 'direitos' ? 'direitos-humanos' : cat.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#312E81] text-white shadow-xs border border-[#312E81]'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => showToast('Mais categorias em breve!')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 transition-colors whitespace-nowrap cursor-pointer"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
            <span>Mais</span>
          </button>
        </div>

        {/* HERO: FOTO DE MÃOS UNIDAS + PAINEL DE IMPACTO */}
        <div className="rounded-3xl bg-[#0F0B2E] text-white border border-violet-900/60 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          {/* Imagem de Fundo (mãos unidas) cobrindo a área central/direita */}
          <div className="lg:col-span-12 lg:absolute lg:inset-0 lg:col-start-1">
            <img
              src="/imagens-paginas/06-impacto-global/direitos-humanos/1direitoshumanos.png"
              alt="Mãos unidas em solidariedade"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0B2E] via-[#0F0B2E]/85 to-[#0F0B2E]/20" />
          </div>

          <div className="relative z-10 lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-['Outfit'] leading-tight tracking-tight text-white max-w-md">
              Direitos Humanos são direitos de todos.
            </h2>
            <p className="text-xs sm:text-sm text-violet-100/85 font-normal leading-relaxed max-w-md">
              Promovemos a dignidade humana, a igualdade, a liberdade e a justiça. Apoie iniciativas que defendem e protegem os direitos fundamentais em todo o mundo.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('projetos-destaque');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#312E81] hover:bg-violet-50 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <span>Explorar iniciativas de direitos humanos</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-4 lg:col-start-9 p-5 sm:p-6 lg:p-8 lg:my-8 lg:mr-8 bg-white/8 backdrop-blur-md rounded-2xl border border-white/10 space-y-3.5 self-center mx-6 mb-6 lg:mx-0 lg:mb-0">
            <h3 className="text-xs sm:text-sm font-bold text-violet-200 font-['Outfit'] uppercase tracking-wider">
              Impacto em Direitos Humanos
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { icon: <Users className="w-3.5 h-3.5" />, value: '4.875.320', label: 'Pessoas Impactadas' },
                { icon: <Users className="w-3.5 h-3.5" />, value: '276', label: 'Organizações' },
                { icon: <Megaphone className="w-3.5 h-3.5" />, value: '214', label: 'Campanhas Ativas' },
                { icon: <HeartHandshake className="w-3.5 h-3.5" />, value: '783.650', label: 'Pessoas Apoiadas' },
                { icon: <Heart className="w-3.5 h-3.5" />, value: '2.143.480 h', label: 'Horas de Voluntariado' },
                { icon: <Globe className="w-3.5 h-3.5" />, value: '98', label: 'Países' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0">
                    {row.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">{row.value}</div>
                    <div className="text-[11px] text-violet-100/70">{row.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LAYOUT PRINCIPAL EM DUAS COLUNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUNA ESQUERDA (8 COLUNAS) */}
          <div className="lg:col-span-8 space-y-6">
            {/* ÁREAS DE IMPACTO */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Áreas de impacto em direitos humanos
                </h2>
                <button
                  onClick={() => showToast('Exibindo todas as áreas de impacto')}
                  className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {impactAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => showToast(`Área: ${area.title}`)}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-violet-300 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-10 h-10 rounded-xl ${area.iconBg} border flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                        {area.icon}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0F1E3D] font-['Outfit'] mb-1">
                        {area.title}
                      </h3>
                      <p className="text-[11.5px] text-slate-500 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[11px] font-bold ${area.badgeColor}`}>
                        {area.initiativesCount}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJETOS EM DESTAQUE + IMPACTO POR REGIÃO */}
            <section id="projetos-destaque" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Projetos em destaque
                </h2>
                <button
                  onClick={() => showToast('Navegando projetos...')}
                  className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs overflow-hidden transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#312E81]/90 backdrop-blur-xs text-white shadow-xs">
                        {proj.tag}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {proj.location}
                        </div>
                        <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit'] mt-0.5 group-hover:text-[#312E81] transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">
                            Impactadas: <strong className="text-slate-800 font-bold">{proj.impactPeople}</strong>
                          </span>
                          <span className="font-bold text-[#312E81]">{proj.progressPercent}% da meta</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#312E81] rounded-full transition-all duration-500"
                            style={{ width: `${proj.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* IMPACTO POR REGIÃO */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                    Impacto por região
                  </h3>
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver todas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 bg-[#F8FAFC] rounded-xl p-3 border border-slate-100 relative">
                    <svg viewBox="0 0 500 240" className="w-full h-auto">
                      <path d="M60 40 L130 35 L160 70 L140 100 L110 95 L95 125 L75 95 L50 65 Z" fill="#DDD6FE" stroke="#6D28D9" strokeWidth="1" />
                      <path d="M110 115 L145 125 L165 160 L140 220 L120 180 L105 130 Z" fill="#C4B5FD" stroke="#6D28D9" strokeWidth="1" />
                      <path d="M210 40 L270 35 L285 75 L250 85 L225 70 L215 50 Z" fill="#A78BFA" stroke="#5B21B6" strokeWidth="1" />
                      <path d="M220 85 L280 80 L310 130 L280 190 L240 190 L220 120 Z" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1" />
                      <path d="M285 40 L410 35 L440 90 L390 125 L320 115 L290 75 Z" fill="#A78BFA" stroke="#5B21B6" strokeWidth="1" />
                      <path d="M380 150 L440 145 L450 185 L390 190 Z" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1" />
                      <circle cx="260" cy="130" r="5" fill="#312E81" />
                      <circle cx="260" cy="130" r="10" fill="none" stroke="#312E81" strokeWidth="1.5" opacity="0.5" />
                    </svg>
                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10.5px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-md shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#312E81]" />
                      <span>África (34%)</span>
                    </div>
                  </div>

                  <div className="md:col-span-4 space-y-2 text-xs">
                    {[
                      { region: 'África', pct: '34%', width: '34%' },
                      { region: 'Ásia', pct: '26%', width: '26%' },
                      { region: 'América Latina', pct: '20%', width: '20%' },
                      { region: 'Europa', pct: '12%', width: '12%' },
                      { region: 'América do Norte', pct: '8%', width: '8%' },
                    ].map((r, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-600 font-medium">{r.region}</span>
                          <span className="font-bold text-[#312E81]">{r.pct}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#312E81] rounded-full" style={{ width: r.width }} />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#312E81] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Ver relatório completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* O IMPACTO EM NÚMEROS */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                O impacto em números
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {impactCards.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all">
                    <div className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                      {c.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mb-2">
                      {c.label}
                    </div>
                    <div className="inline-block text-[10.5px] font-bold px-2 py-0.5 rounded-full mb-3 bg-violet-50 text-violet-700">
                      ▲ {c.change}
                    </div>

                    <div className="h-9 w-full pt-1">
                      <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id={`spark-${c.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill={`url(#spark-${c.id})`}
                          stroke="#7C3AED"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={c.sparkline.map((val, idx) => `${idx * 12.5},${30 - (val / 100) * 25}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA (4 COLUNAS) */}
          <div className="lg:col-span-4 space-y-6">
            {/* MAIS POPULARES */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                  Mais populares em Direitos Humanos
                </h3>
                <button
                  onClick={() => showToast('Exibindo lista completa de iniciativas')}
                  className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {popularInitiatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => showToast(`Iniciativa: ${item.title}`)}
                    className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 text-center text-xs font-bold text-slate-400 shrink-0">
                        {item.rank}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Scale className="w-4 h-4 text-violet-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F1E3D] truncate group-hover:text-[#312E81] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.supporters}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      ▲ {item.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RECURSOS E FERRAMENTAS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  onClick={() => showToast('Todos os recursos disponíveis')}
                  className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {toolsAndResources.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveToolModal(t.title)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${t.bg} border flex items-center justify-center shrink-0`}>
                        {t.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F1E3D] group-hover:text-[#312E81] transition-colors truncate">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {t.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA "DEFENDER DIREITOS" */}
            <div className="rounded-2xl bg-[#1E1B4B] text-white p-6 border border-violet-900/40 relative overflow-hidden shadow-sm space-y-4">
              <div className="h-44 rounded-xl overflow-hidden relative shadow-inner bg-[#312E81] flex items-center justify-center">
                <Users className="w-16 h-16 text-violet-300" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-transparent to-transparent" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black font-['Outfit'] leading-snug">
                  Defender direitos é construir um futuro mais justo para todos.
                </h3>
                <p className="text-xs text-violet-100/80 leading-relaxed font-normal">
                  Junte-se a iniciativas que protegem a dignidade humana em todo o mundo.
                </p>
              </div>

              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-violet-50 text-[#312E81] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explorar Iniciativas</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: APOIAR INICIATIVA */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#312E81] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                    Apoiar Iniciativa de Direitos Humanos
                  </h3>
                  <p className="text-xs text-slate-500">Contribua diretamente para a defesa da dignidade humana</p>
                </div>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Escolha o valor de contribuição (EUR)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDonationAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        donationAmount === amt
                          ? 'bg-[#312E81] text-white border-[#312E81] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {amt} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-violet-50/70 border border-violet-100 rounded-2xl text-xs text-violet-900 space-y-1">
                <span className="font-bold">Impacto estimado com {donationAmount} €:</span>
                <p className="text-[11.5px] text-violet-800">
                  Apoio jurídico para {donationAmount * 2} pessoas e {donationAmount * 3} horas de capacitação em direitos humanos para defensores locais.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupportModalOpen(false);
                    showToast(`Obrigado pelo seu apoio de ${donationAmount} €! Iniciativa fortalecida.`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirmar Apoio
                </button>
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DETALHES DO PROJETO */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="relative h-56">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#312E81] text-white">
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <h3 className="text-xl font-black text-[#0F1E3D] font-['Outfit']">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProject.description} Este projeto reúne organizações locais, defensores de direitos humanos e voluntários comprometidos com mudanças estruturais duradouras.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pessoas Beneficiadas</span>
                  <span className="font-extrabold text-[#0F1E3D] text-sm">{selectedProject.impactPeople}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status do Projeto</span>
                  <span className="font-extrabold text-[#312E81] text-sm">{selectedProject.progressPercent}% Concluído</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsSupportModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Apoiar este Projeto</span>
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FERRAMENTA / RECURSO */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                {activeToolModal}
              </h3>
              <button
                onClick={() => setActiveToolModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              O módulo <strong>{activeToolModal}</strong> faz parte do ecossistema aberto VILA para apoiar defensores de direitos humanos, organizações e cidadãos com informação confiável e recursos práticos.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-violet-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso público e gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-violet-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dados verificados por parceiros independentes</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveToolModal(null);
                  showToast(`${activeToolModal} iniciado com sucesso!`);
                }}
                className="w-full py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Abrir Ferramenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RELATÓRIO COMPLETO */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                  Relatório de Impacto Regional
                </h3>
                <p className="text-xs text-slate-500">Distribuição global de iniciativas de direitos humanos ativas</p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 text-violet-900">
                <span className="font-bold block mb-1">África (34% do impacto total)</span>
                Campanhas de igualdade, apoio jurídico a comunidades marginalizadas e proteção de defensores de direitos humanos.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">Ásia (26% do impacto total)</span>
                Liberdade de expressão, proteção de minorias religiosas e acesso à justiça para populações rurais.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">América Latina (20% do impacto total)</span>
                Direitos das crianças, proteção de jornalistas e combate à violência de género.
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanRightsImpactView;
