
import React from 'react';
import { cn } from '@/lib/utils';

type CallDialogProgressProps = {
  total: number;
  current: number;
};

const CallDialogProgress = ({ total, current }: CallDialogProgressProps) => {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 my-2">
      {Array.from({ length: total }).map((_, idx) => (
        <div 
          key={idx} 
          className={cn(
            "w-2 h-2 sm:w-3 sm:h-3 rounded-full",
            idx <= current ? "bg-kidorange" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default CallDialogProgress;
