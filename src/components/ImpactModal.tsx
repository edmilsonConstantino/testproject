import React from 'react';
import { X, TrendingUp, Trees, Zap, Droplets, HeartHandshake, CheckCircle } from 'lucide-react';

interface ImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImpactModal: React.FC<ImpactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="impact-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="impact-modal-container"
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 sm:p-7 animate-in zoom-in-95 duration-150 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#0F1E3D] font-['Outfit']">
              Relatório de Impacto Global VILA
            </h3>
            <p className="text-xs text-[#64748B]">Metas atingidas e resultados verificados em 2026</p>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <Trees className="w-5 h-5 text-[#10B981] mb-2" />
            <p className="text-xl font-extrabold text-[#0F1E3D]">4.2M+</p>
            <p className="text-[11px] font-semibold text-[#065F46]">Árvores Nativas Plantadas</p>
            <p className="text-[10px] text-slate-500 mt-1">Reflorestação em 38 países.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <Droplets className="w-5 h-5 text-[#2563EB] mb-2" />
            <p className="text-xl font-extrabold text-[#0F1E3D]">1.8M L</p>
            <p className="text-[11px] font-semibold text-[#1E40AF]">Água Potável Fornecida</p>
            <p className="text-[10px] text-slate-500 mt-1">Sistemas comunitários solares.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
            <Zap className="w-5 h-5 text-amber-500 mb-2" />
            <p className="text-xl font-extrabold text-[#0F1E3D]">320 GWh</p>
            <p className="text-[11px] font-semibold text-amber-800">Energia Limpa Gerada</p>
            <p className="text-[10px] text-slate-500 mt-1">Cooperativas solares e eólicas.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
            <HeartHandshake className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-xl font-extrabold text-[#0F1E3D]">3.412</p>
            <p className="text-[11px] font-semibold text-purple-900">Parcerias Cidadãs</p>
            <p className="text-[10px] text-slate-500 mt-1">Governos, ONGs e vilas.</p>
          </div>
        </div>

        {/* Global statement */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
          <p className="text-xs text-[#334155]">
            Todos os dados são auditados por sensores IoT descentralizados e relatórios comunitários abertos.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-white font-bold text-xs transition-colors"
        >
          Fechar Relatório
        </button>
      </div>
    </div>
  );
};
