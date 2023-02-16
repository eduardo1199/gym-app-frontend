import { ReactNode } from 'react';

interface CardStatisticsProps {
  description: string;
  title: string;
  amount: number;
  icon: ReactNode;
  variant: 'warning' | 'default';
}

export function CardStatistics(props: CardStatisticsProps) { 
  return (
    <div 
    className={`flex flex-1 h-[300px] border-2 shadow-regular ${props.variant === 'warning' ? 'border-alert-danger': 'border-tertiary-gray'} rounded-2xl justify-between items-center p-6 transition-all duration-100 hover:border-4`}
    >         
      <div className="flex flex-col gap-5">
        <span className="text-base font-semibold text-slate-600">
          {props.description}
        </span>
        <h1 className={`font-bold text-3xl ${props.variant === 'warning' ? 'text-alert-danger' : 'text-primary-blue'}`}>
         {props.amount} {props.title}
        </h1>
      </div>
      {props.icon}  
    </div>
  )
}