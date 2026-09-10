import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import {
  Leaf,
  Users,
  Globe,
  TrendingUp,
  Heart,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  TreePine,
  Zap,
  GraduationCap,
  Recycle,
  Lightbulb,
  Building2,
  Droplets,
  Sun,
  X,
  Target,
  SlidersHorizontal,
  Share2,
  Scale,
  Activity,
  Rocket,
  Palette,
  MoreHorizontal,
  Calendar,
  Calculator,
  Coins,
  Video,
  Network,
  Wrench,
  ExternalLink,
  Sprout,
  Compass,
  Filter
} from 'lucide-react';

export interface EnvironmentImpactViewProps {
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
  category: string;
}

export const EnvironmentImpactView: React.FC<EnvironmentImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = (_tabId?: string) => {},
  onNavigateToCategory,
}) => {
  // State
  const [activeCategory, setActiveCategory] = useState<string>('ambiente');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [supportSuccessToast, setSupportSuccessToast] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);

  const showToast = (msg: string) => {
    setSupportSuccessToast(msg);
    setTimeout(() => setSupportSuccessToast(null), 3000);
  };

  // Top Metrics Ribbon
  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '842', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Organizações', value: '215', icon: <Building2 className="w-4 h-4 text-slate-500" /> },
    { label: 'Países', value: '96', icon: <Globe className="w-4 h-4 text-slate-500" /> },
    { label: 'Pessoas Impactadas', value: '3.215.780', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Áreas Restauradas', value: '78.540 ha', icon: <TreePine className="w-4 h-4 text-slate-500" /> },
    { label: 'CO₂ Evitado', value: '2.417.890 t', icon: <Sparkles className="w-4 h-4 text-slate-500" /> },
    { label: 'Água Preservada', value: '1.245.780 m³', icon: <Droplets className="w-4 h-4 text-slate-500" /> },
  ];

  // Category Filter Pills
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

  // 6 Áreas de Impacto Ambiental
  const impactAreas = [
    {
      id: 'clima',
      title: 'Ação Climática',
      description: 'Redução de emissões e transição para energias renováveis.',
      initiativesCount: '312 iniciativas',
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-100',
      badgeColor: 'text-emerald-700',
    },
    {
      id: 'agua',
      title: 'Água Limpa',
      description: 'Preservação de recursos hídricos e saneamento.',
      initiativesCount: '126 iniciativas',
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-100',
      badgeColor: 'text-blue-700',
    },
    {
      id: 'natureza',
      title: 'Proteção da Natureza',
      description: 'Conservação de florestas, oceanos, fauna e flora.',
      initiativesCount: '198 iniciativas',
      icon: <TreePine className="w-5 h-5 text-emerald-800" />,
      iconBg: 'bg-emerald-100/70 border-emerald-200',
      badgeColor: 'text-emerald-900',
    },
    {
      id: 'residuos',
      title: 'Resíduos & Reciclagem',
      description: 'Redução, reutilização e reciclagem de resíduos.',
      initiativesCount: '142 iniciativas',
      icon: <Recycle className="w-5 h-5 text-purple-600" />,
      iconBg: 'bg-purple-50 border-purple-100',
      badgeColor: 'text-purple-700',
    },
    {
      id: 'agricultura',
      title: 'Agricultura Sustentável',
      description: 'Práticas agrícolas que regeneram o solo e comunidades.',
      initiativesCount: '98 iniciativas',
      icon: <Sprout className="w-5 h-5 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-100',
      badgeColor: 'text-amber-700',
    },
    {
      id: 'consumo',
      title: 'Consumo Consciente',
      description: 'Promoção de estilos de vida sustentáveis e responsáveis.',
      initiativesCount: '116 iniciativas',
      icon: <Lightbulb className="w-5 h-5 text-teal-600" />,
      iconBg: 'bg-teal-50 border-teal-100',
      badgeColor: 'text-teal-700',
    },
  ];

  // Projetos em Destaque
  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Ambiente',
      title: 'Limpeza dos Oceanos',
      location: 'Global',
      description: 'Remoção de plásticos e resíduos dos oceanos e praias.',
      impactPeople: '210K pessoas',
      progressPercent: 84,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p2',
      tag: 'Ambiente',
      title: 'Plantando o Amanhã',
      location: 'Brasil',
      description: 'Reflorestamento de áreas degradadas e recuperação de nascentes.',
      impactPeople: '150K pessoas',
      progressPercent: 72,
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p3',
      tag: 'Ambiente',
      title: 'Energia para Comunidades',
      location: 'África',
      description: 'Instalação de energia solar em comunidades isoladas.',
      impactPeople: '95K pessoas',
      progressPercent: 68,
      imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p4',
      tag: 'Ambiente',
      title: 'Cidades Mais Verdes',
      location: 'Índia',
      description: 'Criação de espaços verdes e jardins urbanos comunitários.',
      impactPeople: '78K pessoas',
      progressPercent: 65,
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
  ];

  // O impacto em números (6 Sparkline Cards)
  const impactCards = [
    {
      id: 'num1',
      value: '3.215.780',
      label: 'Pessoas Impactadas',
      change: '+ 12,4% este mês',
      color: 'emerald',
      sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95],
      badgeBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'num2',
      value: '2.417.890 t',
      label: 'CO₂ Evitado',
      change: '+ 8,7% este mês',
      color: 'blue',
      sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92],
      badgeBg: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'num3',
      value: '78.540 ha',
      label: 'Áreas Restauradas',
      change: '+ 15,3% este mês',
      color: 'emerald',
      sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98],
      badgeBg: 'bg-emerald-50 text-emerald-800',
    },
    {
      id: 'num4',
      value: '1.245.780 m³',
      label: 'Água Preservada',
      change: '+ 9,1% este mês',
      color: 'sky',
      sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91],
      badgeBg: 'bg-sky-50 text-sky-700',
    },
    {
      id: 'num5',
      value: '2.356.890 kg',
      label: 'Resíduos Removidos',
      change: '+ 11,6% este mês',
      color: 'purple',
      sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94],
      badgeBg: 'bg-purple-50 text-purple-700',
    },
    {
      id: 'num6',
      value: '159.342',
      label: 'Voluntários Ativos',
      change: '+ 10,2% este mês',
      color: 'amber',
      sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96],
      badgeBg: 'bg-amber-50 text-amber-700',
    },
  ];

  // Coluna Direita: Mais Populares em Ambiente
  const popularInitiatives = [
    {
      id: 'pop1',
      rank: 1,
      title: 'Restauração de Florestas',
      supporters: '158K apoiadores',
      growth: '24%',
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop2',
      rank: 2,
      title: 'Energia Renovável Comunitária',
      supporters: '132K apoiadores',
      growth: '18%',
      imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop3',
      rank: 3,
      title: 'Proteção dos Oceanos',
      supporters: '98K apoiadores',
      growth: '16%',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop4',
      rank: 4,
      title: 'Água Potável para Todos',
      supporters: '87K apoiadores',
      growth: '15%',
      imageUrl: 'https://images.unsplash.com/photo-1527199768775-bdabf3b31023?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop5',
      rank: 5,
      title: 'Agricultura Regenerativa',
      supporters: '76K apoiadores',
      growth: '12%',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&auto=format&fit=crop&q=80',
    },
  ];

  // Recursos e ferramentas
  const toolsAndResources = [
    {
      id: 'guia',
      title: 'Guia de Ação Ambiental',
      description: 'Passo a passo para iniciar sua iniciativa',
      icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'carbono',
      title: 'Calculadora de Carbono',
      description: 'Meça e reduza sua pegada de carbono',
      icon: <Calculator className="w-4 h-4 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-100',
    },
    {
      id: 'financiamento',
      title: 'Financiamento Verde',
      description: 'Encontre apoios para projetos ambientais',
      icon: <Coins className="w-4 h-4 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'cursos',
      title: 'Cursos e Webinars',
      description: 'Aprenda com especialistas em sustentabilidade',
      icon: <Video className="w-4 h-4 text-cyan-600" />,
      bg: 'bg-cyan-50 border-cyan-100',
    },
    {
      id: 'parcerias',
      title: 'Parcerias Ambientais',
      description: 'Conecte-se com organizações e redes',
      icon: <Network className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'ferramentas',
      title: 'Ferramentas gratuitas',
      description: 'Recursos para potencializar projetos',
      icon: <Wrench className="w-4 h-4 text-orange-600" />,
      bg: 'bg-orange-50 border-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 antialiased text-[#1E293B]">
      {/* Toast de Confirmação */}
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E3B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* TÍTULO DA PÁGINA + BOTÃO APOIAR INICIATIVA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Ícone de Folha em Fundo Verde Escuro */}
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#064E3B] flex items-center justify-center shrink-0 shadow-sm">
              <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                Ambiente
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Protegemos o planeta e promovemos um futuro sustentável para todas as formas de vida.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer group"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className="w-4 h-4 text-emerald-200 group-hover:fill-current group-hover:text-rose-400 transition-colors" />
          </button>
        </div>

        {/* STATS RIBBON (7 METRICS HORIZONTAIS) */}
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
                  if (onNavigateToCategory && (cat.id === 'todas' || cat.id === 'saude' || cat.id === 'tecnologia' || cat.id === 'cultura' || cat.id === 'educacao' || cat.id === 'direitos' || cat.id === 'ambiente' || cat.id === 'empreendedorismo')) {
                    onNavigateToCategory(cat.id === 'direitos' ? 'direitos-humanos' : cat.id);
                  } else {
                    setActiveCategory(cat.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#064E3B] text-white shadow-xs border border-[#064E3B]'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToCategory) {
                onNavigateToCategory('mais');
              } else if (onNavigateToTab) {
                onNavigateToTab('mais');
              } else {
                showToast('Mais categorias em breve!');
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 transition-colors whitespace-nowrap cursor-pointer"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
            <span>Mais</span>
          </button>
        </div>

        {/* HERO FEATURE CARD COM GLOBO 3D ORBITAL */}
        <div className="rounded-3xl bg-gradient-to-br from-[#04281E] via-[#06382B] to-[#0A4B3A] text-white p-6 sm:p-8 lg:p-10 border border-emerald-900/60 relative overflow-hidden shadow-lg">
          {/* Efeitos de luz de fundo */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Esquerda: Frase de Impacto + Texto + Botão */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-['Outfit'] leading-tight tracking-tight text-white">
                Cuidar do planeta<br />é cuidar do futuro.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/85 font-normal leading-relaxed max-w-md">
                Descubra iniciativas que protegem o meio ambiente, restauram ecossistemas e promovem um planeta mais saudável para as gerações presentes e futuras.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('projetos-destaque');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#064E3B] hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
                >
                  <span>Explorar iniciativas ambientais</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Centro: Globo Terrestre 3D Vetorial com 6 Nós Conectados em Órbita */}
            <div className="lg:col-span-4 flex items-center justify-center py-4">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Linhas orbitais tracejadas */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="125"
                    ry="125"
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.35"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="140"
                    ry="65"
                    transform="rotate(-25 150 150)"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                    opacity="0.25"
                  />
                </svg>

                {/* Esfera do Globo Realista */}
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full relative overflow-hidden shadow-2xl ring-2 ring-emerald-400/40">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <radialGradient id="globe-glow" cx="40%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                        <stop offset="35%" stopColor="#0284C7" />
                        <stop offset="70%" stopColor="#075985" />
                        <stop offset="100%" stopColor="#082f49" />
                      </radialGradient>
                      <linearGradient id="landmass-green" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    {/* Fundo do Oceano */}
                    <circle cx="100" cy="100" r="100" fill="url(#globe-glow)" />

                    {/* Continentes */}
                    <path
                      d="M60 40 C75 35 90 42 95 55 C100 68 85 85 95 105 C100 115 115 125 105 145 C95 160 80 150 70 135 C65 120 70 100 65 85 C60 70 50 50 60 40 Z"
                      fill="url(#landmass-green)"
                      opacity="0.9"
                    />
                    <path
                      d="M110 45 C125 40 145 48 150 65 C155 80 135 95 140 110 C145 125 130 140 120 135 C115 125 110 105 115 90 C118 75 105 55 110 45 Z"
                      fill="url(#landmass-green)"
                      opacity="0.9"
                    />
                    <path
                      d="M30 65 C40 60 50 70 45 85 C40 95 30 105 25 95 C20 85 25 70 30 65 Z"
                      fill="url(#landmass-green)"
                      opacity="0.85"
                    />

                    {/* Brilho atmosférico sutil */}
                    <circle cx="100" cy="100" r="99" fill="none" stroke="#67E8F9" strokeWidth="1.5" opacity="0.4" />
                  </svg>
                </div>

                {/* 6 Nós Orbitais Conectados */}
                {/* 1. Topo: Árvore */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-lg ring-2 ring-emerald-400">
                  <TreePine className="w-4 h-4" />
                </div>
                {/* 2. Superior Direito: Água */}
                <div className="absolute top-10 right-2 w-8 h-8 rounded-full bg-white text-[#0284C7] flex items-center justify-center shadow-lg ring-2 ring-sky-400">
                  <Droplets className="w-4 h-4" />
                </div>
                {/* 3. Inferior Direito: Sol / Energia */}
                <div className="absolute bottom-10 right-2 w-8 h-8 rounded-full bg-white text-[#F59E0B] flex items-center justify-center shadow-lg ring-2 ring-amber-400">
                  <Sun className="w-4 h-4" />
                </div>
                {/* 4. Base: Broto */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#10B981] flex items-center justify-center shadow-lg ring-2 ring-emerald-400">
                  <Sprout className="w-4 h-4" />
                </div>
                {/* 5. Inferior Esquerdo: Folha */}
                <div className="absolute bottom-10 left-2 w-8 h-8 rounded-full bg-white text-[#059669] flex items-center justify-center shadow-lg ring-2 ring-emerald-400">
                  <Leaf className="w-4 h-4" />
                </div>
                {/* 6. Superior Esquerdo: Reciclagem */}
                <div className="absolute top-10 left-2 w-8 h-8 rounded-full bg-white text-[#8B5CF6] flex items-center justify-center shadow-lg ring-2 ring-purple-400">
                  <Recycle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Direita: Impacto Ambiental Global com 5 Métricas */}
            <div className="lg:col-span-3 bg-white/5 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3.5">
              <h3 className="text-xs sm:text-sm font-bold text-emerald-200 font-['Outfit'] uppercase tracking-wider">
                Impacto Ambiental Global
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">3.215.780</div>
                    <div className="text-[11px] text-emerald-100/70">Pessoas Impactadas</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <TreePine className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">78.540 ha</div>
                    <div className="text-[11px] text-emerald-100/70">Áreas Restauradas</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">2.417.890 t</div>
                    <div className="text-[11px] text-emerald-100/70">CO₂ Evitado</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">1.245.780 m³</div>
                    <div className="text-[11px] text-emerald-100/70">Água Preservada</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <Recycle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">2.356.890 kg</div>
                    <div className="text-[11px] text-emerald-100/70">Resíduos Removidos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT PRINCIPAL EM DUAS COLUNAS (ESQUERDA 8 COLS, DIREITA 4 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUNA ESQUERDA (8 COLUNAS) */}
          <div className="lg:col-span-8 space-y-6">
            {/* SEÇÃO 1: ÁREAS DE IMPACTO AMBIENTAL */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Áreas de impacto ambiental
                </h2>
                <button
                  onClick={() => setSelectedArea('todas')}
                  className="text-xs font-bold text-[#064E3B] hover:text-[#043d2e] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {impactAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area.title)}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
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

            {/* SEÇÃO 2: PROJETOS EM DESTAQUE + IMPACTO POR REGIÃO */}
            <section id="projetos-destaque" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Projetos em destaque
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => showToast('Navegando projetos...')}
                    className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grid com 4 Projetos + 1 Card de Mapa Regional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs overflow-hidden transition-all cursor-pointer flex flex-col group"
                  >
                    {/* Imagem do Projeto com Tag Ambiente */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#064E3B]/90 backdrop-blur-xs text-white shadow-xs">
                        {proj.tag}
                      </span>
                    </div>

                    {/* Detalhes */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {proj.location}
                        </div>
                        <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit'] mt-0.5 group-hover:text-[#064E3B] transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      {/* Progresso e Pessoas Impactadas */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">
                            Impactadas: <strong className="text-slate-800 font-bold">{proj.impactPeople}</strong>
                          </span>
                          <span className="font-bold text-[#064E3B]">{proj.progressPercent}% da meta</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#064E3B] rounded-full transition-all duration-500"
                            style={{ width: `${proj.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CARD DE IMPACTO POR REGIÃO (Mapa Autêntico) */}
              <div className="mt-4">
                <ImpactRegionMapCard
                  category="ambiente"
                  customRegions={[
                    { id: 'latin-america', name: 'América Latina', percent: 32, projectsCount: 430, highlight: true },
                    { id: 'africa', name: 'África', percent: 24, projectsCount: 320 },
                    { id: 'asia', name: 'Ásia-Pacífico', percent: 20, projectsCount: 270 },
                    { id: 'europe', name: 'Europa', percent: 16, projectsCount: 215 },
                    { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 110 },
                  ]}
                  onOpenReport={() => setIsReportModalOpen(true)}
                  onSeeAll={() => setIsReportModalOpen(true)}
                />
              </div>
            </section>

            {/* SEÇÃO 3: O IMPACTO EM NÚMEROS (6 SPARKLINES) */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                O impacto em números
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {impactCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
                  >
                    <div className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                      {c.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mb-2">
                      {c.label}
                    </div>
                    <div className="inline-block text-[10.5px] font-bold px-2 py-0.5 rounded-full mb-3 bg-emerald-50 text-emerald-700">
                      ▲ {c.change}
                    </div>

                    {/* Mini Sparkline SVG */}
                    <div className="h-9 w-full pt-1">
                      <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id={`spark-${c.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill={`url(#spark-${c.id})`}
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={c.sparkline
                            .map((val, idx) => `${idx * 12.5},${30 - (val / 100) * 25}`)
                            .join(' ')}
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
            {/* 1. MAIS POPULARES EM AMBIENTE */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                  Mais populares em Ambiente
                </h3>
                <button
                  onClick={() => showToast('Exibindo lista completa de iniciativas')}
                  className="text-xs font-bold text-[#064E3B] hover:text-[#043d2e] inline-flex items-center gap-1 cursor-pointer"
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
                      {/* Posição 1, 2, 3... */}
                      <span className="w-5 text-center text-xs font-bold text-slate-400 shrink-0">
                        {item.rank}
                      </span>
                      {/* Miniatura */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F1E3D] truncate group-hover:text-[#064E3B] transition-colors">
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

            {/* 2. RECURSOS E FERRAMENTAS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  onClick={() => showToast('Todos os recursos disponíveis')}
                  className="text-xs font-bold text-[#064E3B] hover:text-[#043d2e] inline-flex items-center gap-1 cursor-pointer"
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
                        <div className="text-xs font-bold text-[#0F1E3D] group-hover:text-[#064E3B] transition-colors truncate">
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

            {/* 3. CTA BANNER "SEJA PARTE DA MUDANÇA" */}
            <div className="rounded-2xl bg-[#063324] text-white p-6 border border-emerald-900/40 relative overflow-hidden shadow-sm space-y-4">
              {/* Imagem de Mãos Segurando Broto na Terra */}
              <div className="h-44 rounded-xl overflow-hidden relative shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80"
                  alt="Mãos com broto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063324] via-transparent to-transparent" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black font-['Outfit'] leading-snug">
                  Seja parte da mudança que o mundo precisa.
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                  Apoie iniciativas ambientais e faça parte de um futuro mais sustentável para todos.
                </p>
              </div>

              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#064E3B] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
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
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                    Apoiar Iniciativa Ambiental
                  </h3>
                  <p className="text-xs text-slate-500">Contribua diretamente para a regeneração do planeta</p>
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
                          ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {amt} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-xs text-emerald-900 space-y-1">
                <span className="font-bold">Impacto estimado com {donationAmount} €:</span>
                <p className="text-[11.5px] text-emerald-800">
                  {donationAmount * 4} árvores nativas plantadas e aproximadamente {donationAmount * 25} kg de resíduos plásticos retirados do ecossistema marinho.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupportModalOpen(false);
                    showToast(`Obrigado pelo seu apoio de ${donationAmount} €! Iniciativa fortalecida.`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#064E3B] text-white">
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <h3 className="text-xl font-black text-[#0F1E3D] font-['Outfit']">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProject.description} Este projeto colaborativo reúne ONGs, comunidades locais e cidadãos voluntários comprometidos com soluções de longo prazo e monitoramento por satélite.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pessoas Beneficiadas</span>
                  <span className="font-extrabold text-[#0F1E3D] text-sm">{selectedProject.impactPeople}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status do Projeto</span>
                  <span className="font-extrabold text-[#064E3B] text-sm">{selectedProject.progressPercent}% Concluído</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsSupportModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
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
              O módulo <strong>{activeToolModal}</strong> faz parte do ecossistema aberto VILA para empoderar coletivos, organizações e cidadãos com metodologias científicas de regeneração.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso público e gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dados auditados e certificados</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveToolModal(null);
                  showToast(`${activeToolModal} iniciado com sucesso!`);
                }}
                className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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
                <p className="text-xs text-slate-500">Distribuição global de intervenções ecológicas ativas</p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-emerald-900">
                <span className="font-bold block mb-1">América do Norte (32% do impacto total)</span>
                Projetos de energia renovável descentralizada e proteção de corredores ecológicos na Costa Oeste e Grandes Lagos.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">Europa (24% do impacto total)</span>
                Restauração de bacias fluviais, reciclagem circular e hortas comunitárias metropolitanas.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">América Latina (20% do impacto total)</span>
                Reflorestamento de biomas tropicais, conservação de nascentes e apoio a populações tradicionais.
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
