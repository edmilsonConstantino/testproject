import React from 'react';
import {
  User,
  Users,
  ShieldCheck,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Edit3,
  Heart,
  Lightbulb,
  Building2,
  Lock,
  Smartphone,
  Laptop,
  Key,
  Shield,
  MessageSquare,
  Flame,
  Globe,
  Coins,
  Crown,
  Check,
  Plus,
} from 'lucide-react';
import { PerfilVilaTabId } from './types';

interface VilaPerfilTabProps {
  onNavigateToSubTab?: (tabId: PerfilVilaTabId) => void;
  onOpenAiAssistant?: () => void;
  onNavigateToTab?: (tabId: string) => void;
}

export const VilaPerfilTab: React.FC<VilaPerfilTabProps> = ({
  onNavigateToSubTab,
  onOpenAiAssistant,
  onNavigateToTab,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-start">
      {/* =========================================================================
          LADO ESQUERDO / PRINCIPAL (xl:col-span-8 ou 9)
      ========================================================================= */}
      <div className="xl:col-span-8 2xl:col-span-9 space-y-4 sm:space-y-5 min-w-0">
        {/* LINHA 1: Card Perfil + Card Nível VILA + Grid de 6 Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
          {/* 1.1 Card Perfil Resumo (md:col-span-4) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div className="flex flex-col items-center text-center">
              {/* Avatar com Badge de Verificação */}
              <div className="relative mb-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
                  alt="Inês Pereira"
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover ring-4 ring-slate-100 shadow-sm"
                />
                <div
                  className="absolute bottom-1 right-1 w-5 h-5 bg-[#0055FE] text-white rounded-full flex items-center justify-center ring-2 ring-white shadow-xs"
                  title="Perfil Verificado"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Nome e Cargo */}
              <div className="flex items-center gap-1.5 justify-center">
                <h2 className="text-base sm:text-lg font-black text-[#0F172A] font-['Outfit']">
                  Inês Pereira
                </h2>
                <CheckCircle2 className="w-4 h-4 text-[#0055FE] fill-[#0055FE]/15" />
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700">
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>Cidadã Global VILA</span>
              </div>

              {/* Localização e Data de Entrada */}
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Faro, Algarve, Portugal</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Membro desde março de 2024</span>
                </div>
              </div>

              {/* 3 Medalhas / Chips Territoriais */}
              <div className="flex items-center justify-center gap-2 mt-3.5">
                <div
                  className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] shadow-2xs"
                  title="Portugal"
                >
                  🇵🇹
                </div>
                <div
                  className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[10px] text-emerald-700 font-bold shadow-2xs"
                  title="Algarve"
                >
                  🌿
                </div>
                <div
                  className="w-6 h-6 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[10px] text-blue-700 font-bold shadow-2xs"
                  title="Cidadania Global"
                >
                  🌐
                </div>
              </div>
            </div>

            {/* Botão Editar Perfil */}
            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('identidade')}
              className="mt-4 w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Editar perfil</span>
            </button>
          </div>

          {/* 1.2 Card Nível VILA (md:col-span-3) */}
          <div className="md:col-span-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Nível VILA
              </span>

              <div className="flex flex-col items-center text-center my-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 mb-2">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#0F172A] font-['Outfit']">
                  Embaixadora
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Líder pelo exemplo e impacto
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${(2450 / 3000) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-800">2.450 / 3.000 XP</span>
              </div>
              <p className="text-[10px] text-slate-400">Próximo nível: Líder Global</p>
            </div>
          </div>

          {/* 1.3 Grid de 6 Métricas Rápidas (md:col-span-5) */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* Métrica 1: Territórios */}
            <div
              onClick={() => onNavigateToSubTab?.('territorios')}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Territórios
                </div>
                <div className="text-lg font-black text-[#0F172A] font-['Outfit']">4</div>
                <div className="text-[10px] text-slate-500">Ativos</div>
              </div>
            </div>

            {/* Métrica 2: Participações */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Participações
                </div>
                <div className="text-lg font-black text-[#0F172A] font-['Outfit']">86</div>
                <div className="text-[10px] text-slate-500">Este mês</div>
              </div>
            </div>

            {/* Métrica 3: Ideias Submetidas */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Ideias
                </div>
                <div className="text-lg font-black text-[#0F172A] font-['Outfit']">12</div>
                <div className="text-[10px] text-slate-500">Aprovadas: 4</div>
              </div>
            </div>

            {/* Métrica 4: Conquistas */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Conquistas
                </div>
                <div className="text-lg font-black text-[#0F172A] font-['Outfit']">18</div>
                <div className="text-[10px] text-slate-500">Desbloqueadas</div>
              </div>
            </div>

            {/* Métrica 5: Impacto Gerado */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Impacto
                </div>
                <div className="text-lg font-black text-[#0F172A] font-['Outfit']">1.245</div>
                <div className="text-[10px] text-slate-500">Pontos</div>
              </div>
            </div>

            {/* Métrica 6: Nível Atual */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Nível Atual
                </div>
                <div className="text-xs sm:text-[13px] font-black text-[#0F172A] font-['Outfit'] truncate">
                  Embaixadora
                </div>
                <div className="text-[10px] text-purple-600 font-semibold">Top 8%</div>
              </div>
            </div>
          </div>
        </div>

        {/* LINHA 2: 3 Cards (A Minha Identidade, Os Meus Territórios, Participação Cívica) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Card 2.1: A Minha Identidade */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
                  A Minha Identidade
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToSubTab?.('identidade')}
                  className="text-xs font-semibold text-[#0055FE] hover:underline cursor-pointer"
                >
                  Editar
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[10.5px] text-slate-400 block font-medium">Nome completo</span>
                  <span className="font-bold text-slate-800">Inês Pereira</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block font-medium">Idioma</span>
                  <span className="text-slate-700 font-medium">Português (Portugal)</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block font-medium">Localização principal</span>
                  <span className="text-slate-700 font-medium">Faro, Algarve, Portugal</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block font-medium">Nacionalidade</span>
                  <span className="text-slate-700 font-medium">Portuguesa</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-slate-400 block font-medium">Biografia</span>
                  <p className="text-slate-600 leading-relaxed text-[11px] line-clamp-2">
                    Apaixonada por cidades sustentáveis e comunidades inovadoras.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10.5px] text-slate-400 block font-medium mb-1.5">Interesses</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Sustentabilidade
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  Habitação
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Mobilidade
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                  Educação
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateToSubTab?.('interesses-geral')}
                  className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                  title="Ver mais interesses"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Card 2.2: Os Meus Territórios */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
                  Os Meus Territórios
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToSubTab?.('territorios')}
                  className="text-xs font-semibold text-[#0055FE] hover:underline cursor-pointer"
                >
                  Adicionar
                </button>
              </div>

              {/* Árvore Hierárquica de Territórios */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="text-sm">🇵🇹</span>
                  <span>Portugal</span>
                </div>

                <div className="pl-4 border-l-2 border-slate-200 ml-2 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Algarve</span>
                  </div>

                  <div className="pl-4 border-l-2 border-slate-200 ml-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <MapPin className="w-3 h-3 text-[#0055FE]" />
                        <span>Faro</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Principal
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>Loulé</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>Olhão</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('territorios')}
              className="text-xs font-semibold text-[#0055FE] hover:underline flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
            >
              <span>Ver todos os territórios (4)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2.3: Participação Cívica */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
                  Participação Cívica
                </h3>
                <span className="text-xs font-semibold text-[#0055FE] cursor-pointer hover:underline">
                  Ver detalhes
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>Consultas Participadas</span>
                  </div>
                  <span className="font-bold text-slate-900">34</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <span>Projetos Comentados</span>
                  </div>
                  <span className="font-bold text-slate-900">21</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <span>Projetos Apoiados</span>
                  </div>
                  <span className="font-bold text-slate-900">56</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Coins className="w-3.5 h-3.5" />
                    </div>
                    <span>Orçamentos Participativos</span>
                  </div>
                  <span className="font-bold text-slate-900">9</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Lightbulb className="w-3.5 h-3.5" />
                    </div>
                    <span>Ideias Submetidas</span>
                  </div>
                  <span className="font-bold text-slate-900">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LINHA 3: As Minhas Conquistas + O Meu Impacto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
          {/* Card 3.1: As Minhas Conquistas (md:col-span-7) */}
          <div className="md:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
                As Minhas Conquistas
              </h3>
              <span className="text-xs font-semibold text-[#0055FE] cursor-pointer hover:underline">
                Ver todas
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              {/* Badge 1: Semente */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-bold text-slate-900">Semente</h4>
                <p className="text-[9.5px] text-slate-400">Primeiros passos</p>
                <span className="mt-1 text-[9px] font-bold text-emerald-600">Conquistada</span>
              </div>

              {/* Badge 2: Guardião */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-bold text-slate-900">Guardião</h4>
                <p className="text-[9.5px] text-slate-400">Cuida da comu.</p>
                <span className="mt-1 text-[9px] font-bold text-emerald-600">Conquistada</span>
              </div>

              {/* Badge 3: Embaixador */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-1.5 shadow-2xs">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-bold text-slate-900">Embaixador</h4>
                <p className="text-[9.5px] text-slate-400">Impacto reconhecido</p>
                <span className="mt-1 text-[9px] font-bold text-amber-600">Conquistada</span>
              </div>

              {/* Badge 4: Líder Comunitário */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-bold text-slate-900">Líder Com.</h4>
                <p className="text-[9.5px] text-slate-400">Lidera p/ exemplo</p>
                <div className="w-full h-1 bg-purple-100 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[80%]" />
                </div>
                <span className="text-[8.5px] font-bold text-purple-700 mt-0.5">80%</span>
              </div>

              {/* Badge 5: Lenda VILA */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center mb-1.5 shadow-2xs">
                  <Crown className="w-5 h-5" />
                </div>
                <h4 className="text-[11px] font-bold text-slate-900">Lenda VILA</h4>
                <p className="text-[9.5px] text-slate-400">Máximo reconh.</p>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-slate-600 rounded-full w-[25%]" />
                </div>
                <span className="text-[8.5px] font-bold text-slate-600 mt-0.5">25%</span>
              </div>
            </div>
          </div>

          {/* Card 3.2: O Meu Impacto (md:col-span-5) */}
          <div className="md:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
                O Meu Impacto
              </h3>
              <span className="text-xs font-semibold text-[#0055FE] cursor-pointer hover:underline">
                Ver relatório
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Donut Circular SVG */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Fundo */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Segmento 1: Azul */}
                  <path
                    className="text-[#0055FE]"
                    strokeDasharray="45, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Segmento 2: Ciano */}
                  <path
                    className="text-cyan-400"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-45"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Segmento 3: Roxo */}
                  <path
                    className="text-purple-500"
                    strokeDasharray="18, 100"
                    strokeDashoffset="-70"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-slate-900 leading-none">1.245</span>
                  <span className="text-[8px] text-slate-400 leading-tight">Pontos</span>
                </div>
              </div>

              {/* Lista de Métricas */}
              <div className="flex-1 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#0055FE]" />
                    <span>Pessoas Impactadas</span>
                  </div>
                  <span className="font-bold text-slate-900">1.244</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Projetos Apoiados</span>
                  </div>
                  <span className="font-bold text-slate-900">43</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Municípios Envolvidos</span>
                  </div>
                  <span className="font-bold text-slate-900">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Contributos Realizados</span>
                  </div>
                  <span className="font-bold text-slate-900">127</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LINHA 4: Assinatura + Funcionalidades Ativas + Segurança da Conta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Card 4.1: Assinatura */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Assinatura
              </span>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">VILA Premium</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Plano anual • Renovação em 12/05/2026
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Gerir assinatura</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4.2: Funcionalidades Ativas */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Funcionalidades Ativas
              </span>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Acesso a projetos exclusivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Relatórios avançados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Participação prioritária</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Eventos premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4.3: Segurança da Conta */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                  Segurança da Conta
                </span>
                <span className="text-[10.5px] font-semibold text-[#0055FE] cursor-pointer hover:underline">
                  Ver todas as opções
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between hover:bg-slate-50 p-1 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <span className="font-semibold text-slate-800 block text-[11px]">Palavra-passe</span>
                      <span className="text-[10px] text-slate-400">Última alteração há 30 dias</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="flex items-center justify-between hover:bg-slate-50 p-1 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <span className="font-semibold text-slate-800 block text-[11px]">Autenticação de dois fatores</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Ativada</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="flex items-center justify-between hover:bg-slate-50 p-1 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-slate-400" />
                    <div>
                      <span className="font-semibold text-slate-800 block text-[11px]">Sessões ativas</span>
                      <span className="text-[10px] text-slate-400">3 dispositivos</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LADO DIREITO: 3 WIDGETS (xl:col-span-4 ou 3)
      ========================================================================= */}
      <div className="xl:col-span-4 2xl:col-span-3 space-y-4 sm:space-y-5">
        {/* Widget 1: O Meu Percurso na VILA */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
              O Meu Percurso na VILA
            </h3>
            <span className="text-xs font-semibold text-[#0055FE] cursor-pointer hover:underline">
              Ver tudo &rarr;
            </span>
          </div>

          {/* Timeline Vertical */}
          <div className="relative pl-6 space-y-4 border-l-2 border-slate-100 ml-2">
            {/* Ponto 1: Mar 2024 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white shadow-2xs" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mar 2024</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Entrou na VILA</h4>
              <p className="text-[11px] text-slate-500">Bem-vindo à comunidade global!</p>
            </div>

            {/* Ponto 2: Mai 2024 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white shadow-2xs" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mai 2024</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Primeira participação</h4>
              <p className="text-[11px] text-slate-500">Comentou um projeto em Faro</p>
            </div>

            {/* Ponto 3: Ago 2024 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white shadow-2xs" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Ago 2024</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Primeira ideia aprovada</h4>
              <p className="text-[11px] text-slate-500">Ideia implementada em Loulé</p>
            </div>

            {/* Ponto 4: Jan 2025 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white shadow-2xs" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Jan 2025</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Embaixadora da Comunidade</h4>
              <p className="text-[11px] text-slate-500">Reconhecido pelo seu impacto</p>
            </div>

            {/* Ponto 5: Mai 2025 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-white shadow-2xs" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mai 2025</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Líder em participação</h4>
              <p className="text-[11px] text-slate-500">Top 10% em participações</p>
            </div>
          </div>
        </div>

        {/* Widget 2: VILA AI (Assistente Inteligente) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
                VILA AI
              </h3>
              <p className="text-[10.5px] text-slate-500">A sua assistente inteligente</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">Como posso aumentar o meu impacto?</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">Que projetos existem perto de mim?</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">Que conquistas posso desbloquear?</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">Onde posso participar esta semana?</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Conversar com a VILA AI</span>
          </button>
        </div>

        {/* Widget 3: Atalhos Rápidos */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-[#0F172A] font-['Outfit']">
            Atalhos Rápidos
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('territorios')}
              className="p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 text-left transition-colors cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-emerald-950 block leading-tight">
                Os meus projetos
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('interesses-geral')}
              className="p-3 rounded-xl bg-blue-50/60 hover:bg-blue-50 border border-blue-100 text-left transition-colors cursor-pointer group"
            >
              <Heart className="w-4 h-4 text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-blue-950 block leading-tight">
                Projetos apoiados
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('interesses-temas')}
              className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-50 border border-amber-100 text-left transition-colors cursor-pointer group"
            >
              <Lightbulb className="w-4 h-4 text-amber-600 mb-1" />
              <span className="text-[11px] font-bold text-amber-950 block leading-tight">
                Ideias submetidas
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab?.('eventos')}
              className="p-3 rounded-xl bg-purple-50/60 hover:bg-purple-50 border border-purple-100 text-left transition-colors cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-purple-600 mb-1" />
              <span className="text-[11px] font-bold text-purple-950 block leading-tight">
                Eventos inscritos
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
