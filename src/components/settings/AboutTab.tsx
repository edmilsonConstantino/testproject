import React from 'react';
import {
  Info,
  Globe2,
  Heart,
  Target,
  Sparkles,
  Award,
  Building,
  Mail,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      {/* 1. Apresentação Institucional da VILA */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 sm:p-8 text-white shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Plataforma Global de Ação Coletiva
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] leading-tight">
          VILA — Vivência, Inovação, Liberdade e Ação
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          A VILA é um ecossistema digital independente fundado com o propósito de conectar cidadãos,
          ONGs, cientistas e investidores de impacto social em todo o mundo. Acreditamos que os
          maiores desafios da humanidade — da crise climática à igualdade de oportunidades — só podem
          ser resolvidos através da inteligência coletiva e da cooperação sem fronteiras.
        </p>

        {/* Números da Plataforma */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/60">
          <div>
            <p className="text-2xl font-black text-white font-['Outfit']">196</p>
            <p className="text-xs text-slate-400">Países Conectados</p>
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-400 font-['Outfit']">8.7M+</p>
            <p className="text-xs text-slate-400">Vidas Beneficiadas</p>
          </div>
          <div>
            <p className="text-2xl font-black text-blue-400 font-['Outfit']">3.4K+</p>
            <p className="text-xs text-slate-400">Projetos Ativos</p>
          </div>
          <div>
            <p className="text-2xl font-black text-purple-400 font-['Outfit']">100%</p>
            <p className="text-xs text-slate-400">Open Data Auditado</p>
          </div>
        </div>
      </section>

      {/* 2. Missão, Visão e Propósito */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A] font-['Outfit']">Missão</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Democratizar as ferramentas de mobilização comunitária, financiamento descentralizado e
            ciência aberta para acelerar soluções regenerativas locais.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A] font-['Outfit']">Visão</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Um planeta interligado por redes de confiança mútua, onde qualquer comunidade tem
            soberania e apoio global para prosperar em equilíbrio com a natureza.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A] font-['Outfit']">Propósito</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Colocar a tecnologia ao serviço do bem comum, eliminando intermediários para garantir que
            cada cêntimo e cada hora de trabalho cheguem à linha da frente.
          </p>
        </div>
      </div>

      {/* 3. Valores Fundamentais */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#0F172A] font-['Outfit'] mb-4 pb-2 border-b border-slate-100">
          Valores Fundamentais
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Transparência Radical
            </h4>
            <p className="text-slate-600">
              Cada transação, voto e indicador de projeto é registado de forma imutável e acessível publicamente para qualquer auditoria cidadã.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Empatia e Diversidade
            </h4>
            <p className="text-slate-600">
              Valorização intransigente dos saberes ancestrais, povos originários e minorias em todas as deliberações ecossistémicas.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              Ação Regenerativa
            </h4>
            <p className="text-slate-600">
              Mais do que sustentar, o nosso compromisso é restaurar biomas degradados e regenerar o tecido social das periferias.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              Cooperação Universal
            </h4>
            <p className="text-slate-600">
              Substituição da lógica competitiva de silos pelo compartilhamento livre de metodologias e tecnologias abertas.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Certificações & Alinhamento Estratégico com a ONU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-[#0F172A] font-['Outfit']">
              Certificações & Padrões
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-800">Certified B Corporation</span>
              <span className="text-[11px] text-emerald-600 font-bold">Nota 124.8</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-800">ISO/IEC 27001 (Segurança de Dados)</span>
              <span className="text-[11px] text-emerald-600 font-bold">Certificado</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-800">Pacto Global das Nações Unidas</span>
              <span className="text-[11px] text-emerald-600 font-bold">Signatário Ativo</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-[#0F172A] font-['Outfit']">
              Sede e Contactos Institucionais
            </h3>
          </div>
          <div className="text-xs text-slate-600 space-y-2">
            <p>
              <strong className="text-[#0F172A]">Fundação VILA Global</strong><br />
              Avenida 5 de Outubro, Faro, Algarve, Portugal
            </p>
            <p>
              <strong className="text-[#0F172A]">E-mail geral:</strong> contacto@vilaglobal.org<br />
              <strong className="text-[#0F172A]">Imprensa & Parcerias:</strong> parcerias@vilaglobal.org
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Versão da plataforma: v2.8.4 • Build 2026.09
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
