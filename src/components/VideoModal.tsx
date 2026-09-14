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
        className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0055FE] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0F1E3D] font-serif">Como funciona o ecossistema VILA</h3>
              <p className="text-[11px] text-slate-500 font-mono">2m 14s</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-[#0F1E3D] flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
          <div className="relative z-10 max-w-md space-y-3.5">
            <div className="w-14 h-14 mx-auto rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
            <h4 className="text-lg font-semibold font-serif">
              "O Mundo é uma Vila."
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Como mais de 128 países conectam projetos locais a recursos e parcerias em todo o globo.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-white text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="font-semibold text-[#0F1E3D]">Conexão Direta</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Sem intermediários entre territórios.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="font-semibold text-[#0F1E3D]">Transparência</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Métricas de impacto verificáveis.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="font-semibold text-[#0F1E3D]">VILA AI</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Cruzamento inteligente de iniciativas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
