import React, { useEffect } from 'react';
import {
  ShieldAlert,
  ArrowLeft,
  Home,
  UserCheck,
  Shield,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';

interface AcessoRestritoAdminViewProps {
  currentUser: DemoUser;
  attemptedTab?: string;
  onNavigateToInicio: () => void;
  onSwitchToAdmin?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const AcessoRestritoAdminView: React.FC<AcessoRestritoAdminViewProps> = ({
  currentUser,
  attemptedTab,
  onNavigateToInicio,
  onSwitchToAdmin,
  onBreadcrumbChange,
}) => {
  useEffect(() => {
    if (onBreadcrumbChange) {
      onBreadcrumbChange([
        { label: 'Início', onClick: onNavigateToInicio },
        { label: 'Plataforma' },
        { label: 'Acesso Restrito' },
      ]);
    }
  }, [onBreadcrumbChange, onNavigateToInicio]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          {/* Badge & Icon */}
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center shadow-xs">
                <ShieldAlert className="w-10 h-10" strokeWidth={2.2} />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm border-2 border-white">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3 h-3" />
              <span>Acesso Restrito a Administradores</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Permissão Insuficiente para Esta Área
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              O <strong>Painel de Gestão</strong> e as ferramentas de administração da{' '}
              <strong>Plataforma VILA</strong> são de acesso reservado a administradores municipais,
              regionais e globais da rede.
            </p>
          </div>

          {/* Cartão de Estado do Utilizador Ativo */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 max-w-md mx-auto text-left shadow-2xs">
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{currentUser.name}</h4>
                  <p className="text-slate-500 text-xs">{currentUser.roleLabel}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100/80 text-rose-800 text-[11px] font-bold shrink-0">
                Não Administrador
              </span>
            </div>
            {attemptedTab && (
              <div className="mt-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Rota solicitada:</span>
                <code className="bg-slate-200/70 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  #{attemptedTab}
                </code>
              </div>
            )}
          </div>

          {/* Ações disponíveis */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              id="btn-acesso-restrito-inicio"
              onClick={onNavigateToInicio}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-[#0055FE] hover:bg-blue-600 shadow-sm transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Voltar para o Início</span>
            </button>

            {onSwitchToAdmin && (
              <button
                type="button"
                id="btn-acesso-restrito-switch-admin"
                onClick={onSwitchToAdmin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#0055FE]" />
                <span>Trocar para "VILA Global" (Admin)</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400">
            Dica: No modo de demonstração, pode alternar para o perfil <strong>VILA Global</strong> através
            do menu de utilizador no topo direito ou usando o botão acima.
          </p>
        </div>
      </div>
    </div>
  );
};
