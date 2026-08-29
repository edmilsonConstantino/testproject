import React from 'react';
import { X, Globe, Users, FolderKanban, CheckCircle2, Heart, Share2, ArrowRight } from 'lucide-react';
import { CountryData } from '../types';

interface CountryDetailModalProps {
  isOpen: boolean;
  country: CountryData | null;
  onClose: () => void;
  onJoinCommunity?: (countryName: string) => void;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  isOpen,
  country,
  onClose,
  onJoinCommunity,
}) => {
  if (!isOpen || !country) return null;

  return (
    <div
      id="country-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="country-detail-modal-content"
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image & Header Overlay */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
          <img
            src={country.imageUrl}
            alt={country.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Country Title & Flag */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#DCFCE7] text-[#16A34A] uppercase tracking-wide">
                {country.statusLabel || 'País Ativo'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1.5 flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </h2>
            </div>
            <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
              {country.region} • Capital: {country.capital}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Summary */}
          <p className="text-sm text-[#475569] leading-relaxed">
            {country.description}
          </p>

          {/* Key Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
            <div className="text-center">
              <p className="text-[11px] text-[#94A3B8] font-semibold flex items-center justify-center gap-1">
                <FolderKanban className="w-3.5 h-3.5 text-[#2563EB]" /> Projetos
              </p>
              <p className="text-lg font-black text-[#0F1E3D] mt-0.5">
                {country.projectsCount.toLocaleString('pt-PT')}
              </p>
            </div>
            <div className="text-center border-x border-slate-200">
              <p className="text-[11px] text-[#94A3B8] font-semibold flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#10B981]" /> Comunidades
              </p>
              <p className="text-lg font-black text-[#0F1E3D] mt-0.5">
                {country.communitiesCount.toLocaleString('pt-PT')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-[#94A3B8] font-semibold flex items-center justify-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#6366F1]" /> Cidadãos
              </p>
              <p className="text-lg font-black text-[#0F1E3D] mt-0.5">
                {country.citizensCount.toLocaleString('pt-PT')}
              </p>
            </div>
          </div>

          {/* Active Initiatives */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1E3D] mb-3">
              Iniciativas em Destaque
            </h4>
            <div className="space-y-2">
              {country.initiatives.map((initiative, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#1E3A5F]">
                      {initiative}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">
                    Ativo
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (onJoinCommunity) onJoinCommunity(country.name);
                onClose();
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Aderir à Comunidade de {country.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert(`Link de ${country.name} copiado com sucesso!`);
              }}
              className="w-full sm:w-auto py-3 px-4 rounded-xl border border-[#E2E8F0] text-[#0F1E3D] hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Partilhar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
