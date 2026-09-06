import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface GlobalCalendarWidgetProps {
  onSelectDay?: (day: number) => void;
  onViewFullCalendar?: () => void;
  className?: string;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  hasEvent?: boolean;
}

interface MonthData {
  name: string;
  days: CalendarDay[];
}

const MONTHS_DATA: MonthData[] = [
  {
    name: 'Abril 2024',
    days: [
      { day: 25, isCurrentMonth: false },
      { day: 26, isCurrentMonth: false },
      { day: 27, isCurrentMonth: false },
      { day: 28, isCurrentMonth: false },
      { day: 29, isCurrentMonth: false },
      { day: 30, isCurrentMonth: false },
      { day: 31, isCurrentMonth: false },
      ...Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        isCurrentMonth: true,
        hasEvent: [8, 12, 19, 25].includes(i + 1),
      })),
      { day: 1, isCurrentMonth: false },
      { day: 2, isCurrentMonth: false },
      { day: 3, isCurrentMonth: false },
      { day: 4, isCurrentMonth: false },
      { day: 5, isCurrentMonth: false },
    ].slice(0, 35),
  },
  {
    name: 'Maio 2024',
    days: [
      { day: 29, isCurrentMonth: false },
      { day: 30, isCurrentMonth: false },
      { day: 1, isCurrentMonth: true },
      { day: 2, isCurrentMonth: true },
      { day: 3, isCurrentMonth: true },
      { day: 4, isCurrentMonth: true },
      { day: 5, isCurrentMonth: true },
      { day: 6, isCurrentMonth: true },
      { day: 7, isCurrentMonth: true },
      { day: 8, isCurrentMonth: true },
      { day: 9, isCurrentMonth: true },
      { day: 10, isCurrentMonth: true },
      { day: 11, isCurrentMonth: true },
      { day: 12, isCurrentMonth: true },
      { day: 13, isCurrentMonth: true },
      { day: 14, isCurrentMonth: true, hasEvent: true },
      { day: 15, isCurrentMonth: true, hasEvent: true },
      { day: 16, isCurrentMonth: true }, // Dia selecionado por padrão
      { day: 17, isCurrentMonth: true },
      { day: 18, isCurrentMonth: true },
      { day: 19, isCurrentMonth: true },
      { day: 20, isCurrentMonth: true },
      { day: 21, isCurrentMonth: true },
      { day: 22, isCurrentMonth: true },
      { day: 23, isCurrentMonth: true, hasEvent: true },
      { day: 24, isCurrentMonth: true },
      { day: 25, isCurrentMonth: true },
      { day: 26, isCurrentMonth: true },
      { day: 27, isCurrentMonth: true },
      { day: 28, isCurrentMonth: true },
      { day: 29, isCurrentMonth: true },
      { day: 30, isCurrentMonth: true, hasEvent: true },
      { day: 31, isCurrentMonth: true },
      { day: 1, isCurrentMonth: false },
      { day: 2, isCurrentMonth: false },
    ],
  },
  {
    name: 'Junho 2024',
    days: [
      { day: 27, isCurrentMonth: false },
      { day: 28, isCurrentMonth: false },
      { day: 29, isCurrentMonth: false },
      { day: 30, isCurrentMonth: false },
      { day: 31, isCurrentMonth: false },
      ...Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        isCurrentMonth: true,
        hasEvent: [1, 5, 14, 21].includes(i + 1),
      })),
    ].slice(0, 35),
  },
];

export const GlobalCalendarWidget: React.FC<GlobalCalendarWidgetProps> = ({
  onSelectDay,
  onViewFullCalendar,
  className = '',
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // Default Maio 2024
  const [selectedDay, setSelectedDay] = useState(16);

  const activeMonth = MONTHS_DATA[currentMonthIndex];

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < MONTHS_DATA.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const handleDayClick = (d: CalendarDay) => {
    if (d.isCurrentMonth) {
      setSelectedDay(d.day);
      if (onSelectDay) {
        onSelectDay(d.day);
      }
    }
  };

  return (
    <div
      id="global-calendar-widget"
      className={`rounded-[20px] bg-white border border-slate-100/90 p-5 sm:p-6 min-h-[280px] lg:min-h-[300px] flex flex-col justify-between shadow-[0_4px_24px_rgba(15,23,42,0.04)] ${className}`}
    >
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
            Calendário Global
          </h3>
          <button
            type="button"
            aria-label="Opções do Calendário"
            className="text-slate-300 hover:text-slate-500 transition-colors p-0.5 rounded cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Navegação de Mês */}
        <div className="flex items-center justify-between py-2 px-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={currentMonthIndex === 0}
            aria-label="Mês anterior"
            className="p-1 rounded-md text-[#0055FE] hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <span className="text-xs sm:text-[13px] font-bold text-[#0F172A] font-['Outfit'] select-none">
            {activeMonth.name}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={currentMonthIndex === MONTHS_DATA.length - 1}
            aria-label="Próximo mês"
            className="p-1 rounded-md text-[#0055FE] hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Dias da Semana: SEG TER QUA QUI SEX SÁB DOM */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1 select-none">
          <span>SEG</span>
          <span>TER</span>
          <span>QUA</span>
          <span>QUI</span>
          <span>SEX</span>
          <span>SÁB</span>
          <span>DOM</span>
        </div>

        {/* Grade de Dias */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {activeMonth.days.map((d, index) => {
            const isSelected = d.isCurrentMonth && d.day === selectedDay;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDayClick(d)}
                disabled={!d.isCurrentMonth}
                className={`relative h-7 sm:h-8 rounded-[8px] flex flex-col items-center justify-center transition-all select-none ${
                  !d.isCurrentMonth
                    ? 'text-slate-300 cursor-default'
                    : isSelected
                    ? 'bg-[#0055FE] text-white font-bold shadow-xs cursor-pointer'
                    : 'text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer'
                }`}
              >
                <span className="text-[11.5px] leading-none">{d.day}</span>
                {/* Ponto indicador de evento */}
                {d.hasEvent && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5" />
                )}
                {d.hasEvent && isSelected && (
                  <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rodapé: Link "Ver calendário completo →" */}
      <div className="pt-2 border-t border-slate-100 text-center mt-2">
        <button
          type="button"
          onClick={onViewFullCalendar}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group"
        >
          <span>Ver calendário completo</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
        </button>
      </div>
    </div>
  );
};
