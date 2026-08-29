import React from 'react';
import { X, Play, CheckCircle, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="video-tour-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="video-tour-modal-content"
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F1E3D]">Como funciona o ecossistema VILA</h3>
              <p className="text-[11px] text-[#94A3B8]">Duração: 2 min 14 seg</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-[#0F1E3D] flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
          {/* Animated background rings */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 max-w-md space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#2563EB] to-[#10B981] p-1 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full rounded-full bg-[#0F1E3D] flex items-center justify-center">
                <Play className="w-7 h-7 text-[#10B981] fill-current ml-1" />
              </div>
            </div>
            <h4 className="text-lg font-bold font-['Outfit']">
              "O Mundo é uma Vila. E Nós Somos Um."
            </h4>
            <p className="text-xs text-slate-300">
              Assista à apresentação de como mais de 128 países conectam projetos locais a recursos globais, empoderando comunidades em todo o globo.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white text-xs">
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#0F1E3D]">Conexão Direta</p>
              <p className="text-[10px] text-[#64748B]">Sem intermediários entre cidades.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#0F1E3D]">Transparência Total</p>
              <p className="text-[10px] text-[#64748B]">Métricas auditadas em tempo real.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#0F1E3D]">IA Inteligente</p>
              <p className="text-[10px] text-[#64748B]">Recomendações com VILA AI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
