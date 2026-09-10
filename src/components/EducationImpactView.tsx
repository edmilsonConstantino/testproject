import React, { useState } from 'react';
import {
  GraduationCap,
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
  Scale,
  Activity,
  Rocket,
  Palette,
  MoreHorizontal,
  BookOpen,
  Monitor,
  Smile,
  Sprout,
  School,
  Award,
  Video,
  FileText,
  Handshake,
} from 'lucide-react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';

export interface EducationImpactViewProps {
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

export const EducationImpactView: React.FC<EducationImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = (_tabId?: string) => {},
  onNavigateToCategory,
}) => {
  const [activeCategory] = useState<string>('educacao');
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

  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '1.248', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Organizações', value: '382', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Países', value: '96', icon: <Globe className="w-4 h-4 text-slate-500" /> },
    { label: 'Pessoas Impactadas', value: '5.684.230', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { label: 'Escolas Apoiadas', value: '1.890', icon: <School className="w-4 h-4 text-slate-500" /> },
    { label: 'Bolsas Concedidas', value: '428.760', icon: <Award className="w-4 h-4 text-slate-500" /> },
    { label: 'Horas de Voluntariado', value: '2.147.580 h', icon: <Heart className="w-4 h-4 text-slate-500" /> },
  ];

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

  const impactAreas = [
    {
      id: 'acesso',
      title: 'Acesso à Educação',
      description: 'Garantir que todos tenham acesso à educação básica e de qualidade.',
      initiativesCount: '312 iniciativas',
      icon: <BookOpen className="w-5 h-5 text-violet-600" />,
      iconBg: 'bg-violet-50 border-violet-100',
      badgeColor: 'text-violet-700',
    },
    {
      id: 'inclusao',
      title: 'Inclusão e Equidade',
      description: 'Promover inclusão de grupos vulneráveis e reduzir desigualdades.',
      initiativesCount: '268 iniciativas',
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-100',
      badgeColor: 'text-emerald-700',
    },
    {
      id: 'digital',
      title: 'Educação Digital',
      description: 'Desenvolver competências digitais e acesso a tecnologia.',
      initiativesCount: '198 iniciativas',
      icon: <Monitor className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-100',
      badgeColor: 'text-blue-700',
    },
    {
      id: 'qualidade',
      title: 'Educação de Qualidade',
      description: 'Melhorar ensino, formação de professores e recursos educacionais.',
      initiativesCount: '356 iniciativas',
      icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-100',
      badgeColor: 'text-amber-700',
    },
    {
      id: 'socioemocional',
      title: 'Educação Socioemocional',
      description: 'Desenvolver habilidades socioemocionais para uma vida plena.',
      initiativesCount: '142 iniciativas',
      icon: <Smile className="w-5 h-5 text-rose-600" />,
      iconBg: 'bg-rose-50 border-rose-100',
      badgeColor: 'text-rose-700',
    },
    {
      id: 'sustentavel',
      title: 'Educação Sustentável',
      description: 'Promover educação para a sustentabilidade e cidadania global.',
      initiativesCount: '126 iniciativas',
      icon: <Sprout className="w-5 h-5 text-teal-600" />,
      iconBg: 'bg-teal-50 border-teal-100',
      badgeColor: 'text-teal-700',
    },
  ];

  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Acesso à Educação',
      title: 'Escolas para Comunidades Rurais',
      location: 'Moçambique',
      description: 'Construção e reabilitação de escolas em comunidades remotas.',
      impactPeople: '78K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      tag: 'Educação Digital',
      title: 'Laboratórios Digitais',
      location: 'Quénia',
      description: 'Formação em competências digitais para jovens e professores.',
      impactPeople: '65K pessoas',
      progressPercent: 72,
      imageUrl: 'https://images.unsplash.com/photo-1596496181861-5fb43f7a6c2f?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      tag: 'Bolsas de Estudo',
      title: 'Bolsas que Mudam Vidas',
      location: 'Brasil',
      description: 'Bolsas integrais para estudantes de baixa renda.',
      impactPeople: '112K pessoas',
      progressPercent: 60,
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      tag: 'STEM',
      title: 'Meninas na Ciência',
      location: 'Índia',
      description: 'Inspirar e capacitar meninas em áreas STEM.',
      impactPeople: '55K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80',
    },
  ];

  const impactCards = [
    { id: 'num1', value: '5.684.230', label: 'Pessoas Impactadas', change: '12,4% este mês', sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95] },
    { id: 'num2', value: '1.890', label: 'Escolas Apoiadas', change: '8,7% este mês', sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92] },
    { id: 'num3', value: '428.760', label: 'Bolsas Concedidas', change: '15,2% este mês', sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98] },
    { id: 'num4', value: '2.147.580 h', label: 'Horas de Voluntariado', change: '11,6% este mês', sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91] },
    { id: 'num5', value: '382', label: 'Organizações Parceiras', change: '9,3% este mês', sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94] },
    { id: 'num6', value: '96', label: 'Países', change: '6,2% este mês', sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96] },
  ];

  const popularInitiatives = [
    { id: 'pop1', rank: 1, title: 'Educação para Todos', supporters: '286K apoiadores', growth: '24%' },
    { id: 'pop2', rank: 2, title: 'Alfabetização Digital', supporters: '198K apoiadores', growth: '18%' },
    { id: 'pop3', rank: 3, title: 'STEM para o Futuro', supporters: '142K apoiadores', growth: '16%' },
    { id: 'pop4', rank: 4, title: 'Bolsas que Transformam', supporters: '112K apoiadores', growth: '15%' },
    { id: 'pop5', rank: 5, title: 'Escolas Sustentáveis', supporters: '98K apoiadores', growth: '12%' },
  ];

  const toolsAndResources = [
    { id: 'guia', title: 'Guia de Projetos Educacionais', description: 'Passo a passo para criar iniciativas', icon: <BookOpen className="w-4 h-4 text-violet-600" />, bg: 'bg-violet-50 border-violet-100' },
    { id: 'cursos', title: 'Plataforma de Cursos Abertos', description: 'Cursos gratuitos e certificados', icon: <Monitor className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50 border-blue-100' },
    { id: 'biblioteca', title: 'Biblioteca de Recursos', description: 'Materiais educativos para todos', icon: <FileText className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-100' },
    { id: 'financiamento', title: 'Financiamento e Bolsas', description: 'Encontre apoio para estudantes e escolas', icon: <Award className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 border-amber-100' },
    { id: 'parcerias', title: 'Parcerias Educacionais', description: 'Conecte-se com instituições e ONGs', icon: <Handshake className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 border-rose-100' },
    { id: 'webinars', title: 'Webinars e Workshops', description: 'Aprenda com especialistas da área', icon: <Video className="w-4 h-4 text-cyan-600" />, bg: 'bg-cyan-50 border-cyan-100' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 antialiased text-[#1E293B]">
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A8A] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-blue-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-blue-300" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                Educação
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Educação de qualidade para todos. Aprender hoje, liderar o amanhã.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1739AD] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer group"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className="w-4 h-4 text-blue-200 group-hover:fill-current group-hover:text-rose-400 transition-colors" />
          </button>
        </div>

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
                    ? 'bg-[#1D4ED8] text-white shadow-xs border border-[#1D4ED8]'
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

        {/* HERO: FOTO DE SALA DE AULA + PAINEL DE IMPACTO */}
        <div className="rounded-3xl bg-[#0B1B3B] text-white border border-blue-900/60 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-12 lg:absolute lg:inset-0 lg:col-start-1">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80"
              alt="Criança sorrindo em sala de aula"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3B] via-[#0B1B3B]/85 to-[#0B1B3B]/20" />
          </div>

          <div className="relative z-10 lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-['Outfit'] leading-tight tracking-tight text-white max-w-md">
              Educação é oportunidade. Oportunidade é futuro.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/85 font-normal leading-relaxed max-w-md">
              Apoiamos iniciativas que garantem acesso à educação de qualidade, promovem inclusão, desenvolvem competências e constroem sociedades mais justas e preparadas para o futuro.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('projetos-destaque');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1D4ED8] hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <span>Explorar iniciativas de educação</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-4 lg:col-start-9 p-5 sm:p-6 lg:p-8 lg:my-8 lg:mr-8 bg-white/8 backdrop-blur-md rounded-2xl border border-white/10 space-y-3.5 self-center mx-6 mb-6 lg:mx-0 lg:mb-0">
            <h3 className="text-xs sm:text-sm font-bold text-blue-200 font-['Outfit'] uppercase tracking-wider">
              Impacto da Educação
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { icon: <Users className="w-3.5 h-3.5" />, value: '5.684.230', label: 'Pessoas Impactadas' },
                { icon: <School className="w-3.5 h-3.5" />, value: '1.890', label: 'Escolas Apoiadas' },
                { icon: <Award className="w-3.5 h-3.5" />, value: '428.760', label: 'Bolsas Concedidas' },
                { icon: <Heart className="w-3.5 h-3.5" />, value: '2.147.580 h', label: 'Horas de Voluntariado' },
                { icon: <Globe className="w-3.5 h-3.5" />, value: '96', label: 'Países' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                    {row.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm font-['Outfit']">{row.value}</div>
                    <div className="text-[11px] text-blue-100/70">{row.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Áreas de impacto em educação
                </h2>
                <button
                  onClick={() => showToast('Exibindo todas as áreas de impacto')}
                  className="text-xs font-bold text-[#1D4ED8] hover:text-[#1739AD] inline-flex items-center gap-1 cursor-pointer"
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
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
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
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1D4ED8]/90 backdrop-blur-xs text-white shadow-xs">
                        {proj.tag}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {proj.location}
                        </div>
                        <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit'] mt-0.5 group-hover:text-[#1D4ED8] transition-colors">
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
                          <span className="font-bold text-[#1D4ED8]">{proj.progressPercent}% da meta</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500" style={{ width: `${proj.progressPercent}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ImpactRegionMapCard
                category="educacao"
                className="mt-4"
                onOpenReport={() => setIsReportModalOpen(true)}
                onSeeAll={() => setIsReportModalOpen(true)}
              />
            </section>

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
                    <div className="inline-block text-[10.5px] font-bold px-2 py-0.5 rounded-full mb-3 bg-blue-50 text-blue-700">
                      ▲ {c.change}
                    </div>

                    <div className="h-9 w-full pt-1">
                      <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id={`spark-${c.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill={`url(#spark-${c.id})`}
                          stroke="#1D4ED8"
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

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                  Mais populares em Educação
                </h3>
                <button
                  onClick={() => showToast('Exibindo lista completa de iniciativas')}
                  className="text-xs font-bold text-[#1D4ED8] hover:text-[#1739AD] inline-flex items-center gap-1 cursor-pointer"
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
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F1E3D] truncate group-hover:text-[#1D4ED8] transition-colors">
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

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F1E3D] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  onClick={() => showToast('Todos os recursos disponíveis')}
                  className="text-xs font-bold text-[#1D4ED8] hover:text-[#1739AD] inline-flex items-center gap-1 cursor-pointer"
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
                        <div className="text-xs font-bold text-[#0F1E3D] group-hover:text-[#1D4ED8] transition-colors truncate">
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

            <div className="rounded-2xl bg-[#0B1B3B] text-white p-6 border border-blue-900/40 relative overflow-hidden shadow-sm space-y-4">
              <div className="h-44 rounded-xl overflow-hidden relative shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80"
                  alt="Crianças estudando"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] via-transparent to-transparent" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black font-['Outfit'] leading-snug">
                  Investir em educação é investir no futuro de todos.
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed font-normal">
                  Apoie iniciativas que levam conhecimento, oportunidades e esperança a milhões de pessoas no mundo.
                </p>
              </div>

              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-[#1D4ED8] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Apoiar Iniciativas</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                    Apoiar Iniciativa Educacional
                  </h3>
                  <p className="text-xs text-slate-500">Contribua diretamente para o acesso à educação</p>
                </div>
              </div>
              <button onClick={() => setIsSupportModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
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
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {amt} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs text-blue-900 space-y-1">
                <span className="font-bold">Impacto estimado com {donationAmount} €:</span>
                <p className="text-[11.5px] text-blue-800">
                  {donationAmount * 3} livros escolares e material didático para {Math.round(donationAmount / 5)} estudantes por um trimestre.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupportModalOpen(false);
                    showToast(`Obrigado pelo seu apoio de ${donationAmount} €! Iniciativa fortalecida.`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#1D4ED8] hover:bg-[#1739AD] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="relative h-56">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#1D4ED8] text-white">
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <h3 className="text-xl font-black text-[#0F1E3D] font-['Outfit']">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProject.description} Este projeto reúne escolas, professores e voluntários comprometidos com o acesso duradouro à educação de qualidade.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pessoas Beneficiadas</span>
                  <span className="font-extrabold text-[#0F1E3D] text-sm">{selectedProject.impactPeople}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status do Projeto</span>
                  <span className="font-extrabold text-[#1D4ED8] text-sm">{selectedProject.progressPercent}% Concluído</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsSupportModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#1D4ED8] hover:bg-[#1739AD] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Apoiar este Projeto</span>
                </button>
                <button onClick={() => setSelectedProject(null)} className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeToolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                {activeToolModal}
              </h3>
              <button onClick={() => setActiveToolModal(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              O módulo <strong>{activeToolModal}</strong> faz parte do ecossistema aberto VILA para apoiar estudantes, educadores e organizações com recursos práticos de educação.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-blue-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso público e gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Conteúdo revisado por especialistas</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveToolModal(null);
                  showToast(`${activeToolModal} iniciado com sucesso!`);
                }}
                className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-[#1739AD] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Abrir Ferramenta
              </button>
            </div>
          </div>
        </div>
      )}

      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                  Relatório de Impacto Regional
                </h3>
                <p className="text-xs text-slate-500">Distribuição global de iniciativas educacionais ativas</p>
              </div>
              <button onClick={() => setIsReportModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900">
                <span className="font-bold block mb-1">África (34% do impacto total)</span>
                Construção de escolas rurais, formação de professores e bolsas para estudantes de baixa renda.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">Ásia (28% do impacto total)</span>
                Laboratórios digitais, educação STEM para meninas e alfabetização digital.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">América do Sul (18% do impacto total)</span>
                Bolsas de estudo integrais e programas de mentoria para jovens em vulnerabilidade.
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-[#1739AD] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationImpactView;
