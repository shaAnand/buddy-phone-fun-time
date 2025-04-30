
import React from 'react';
import { Phone, PhoneCall, PhoneOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type PhoneInterfaceProps = {
  status: 'idle' | 'ringing' | 'calling' | 'talking';
  onAnswer?: () => void;
  onHangup?: () => void;
  className?: string;
};

const PhoneInterface = ({
  status,
  onAnswer,
  onHangup,
  className
}: PhoneInterfaceProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className={cn('rounded-full p-6 border-4',
        status === 'idle' ? 'border-gray-300 bg-gray-100' : 
        status === 'ringing' ? 'border-kidorange bg-kidsoftyellow animate-pulse-ring' :
        status === 'calling' ? 'border-kidpink bg-kidsoftpink' :
        'border-kidblue bg-kidsoftblue'
      )}>
        <Phone 
          size={48} 
          className={cn(
            'text-gray-600',
            status === 'ringing' && 'animate-ring-phone text-kidorange',
            status === 'calling' && 'text-kidpink',
            status === 'talking' && 'text-kidblue'
          )} 
        />
      </div>
      
      <div className="flex gap-6">
        {status === 'ringing' && (
          <button 
            onClick={onAnswer}
            className="bg-kidblue text-white rounded-full p-4 shadow-lg hover:bg-opacity-90"
          >
            <PhoneCall size={36} />
          </button>
        )}
        
        {(status === 'calling' || status === 'talking') && (
          <button 
            onClick={onHangup}
            className="bg-kidred text-white rounded-full p-4 shadow-lg hover:bg-opacity-90"
          >
            <PhoneOff size={36} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhoneInterface;
