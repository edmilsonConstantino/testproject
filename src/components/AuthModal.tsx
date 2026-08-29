import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Check } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="auth-modal-container"
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 sm:p-8 animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Header */}
        <div className="text-center flex flex-col items-center">
          <Logo showTagline={false} size="md" />
          <h3 className="text-xl font-extrabold text-[#0F1E3D] font-['Outfit'] mt-3">
            {mode === 'login' ? 'Bem-vindo de volta à VILA' : 'Faça parte da nossa VILA'}
          </h3>
          <p className="text-xs text-[#64748B] mt-1">
            {mode === 'login'
              ? 'Aceda à sua conta para gerir projetos comunitários'
              : 'Junte-se a mais de 7,8 milhões de cidadãos globais'}
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl my-5 text-xs font-semibold">
          <button
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-[#0F1E3D] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-[#0F1E3D] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#10B981] mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#0F1E3D]">Autenticado com sucesso!</h4>
            <p className="text-xs text-slate-500">A carregar a sua experiência na VILA...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-bold text-[#334155] mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria Santos"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-[#0F1E3D]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-[#334155] mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-[#0F1E3D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] mb-1">Palavra-passe</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#2563EB] text-[#0F1E3D]"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-xs text-white transition-all shadow-md mt-2 flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#0D9488]'
                  : 'bg-gradient-to-r from-[#2563EB] to-[#10B981]'
              }`}
            >
              <span>{mode === 'login' ? 'Entrar na Conta' : 'Concluir Registo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
