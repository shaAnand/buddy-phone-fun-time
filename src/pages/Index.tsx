
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog'; 
import FriendCharacter from '@/components/FriendCharacter';
import CallDialog from '@/components/CallDialog';

const Index = () => {
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<'numbers' | 'alphabet'>('numbers');
  
  const handleStartCall = (type: 'numbers' | 'alphabet') => {
    setActivityType(type);
    setIsCallDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-kidsoftblue to-kidsoftgreen flex flex-col items-center p-4">
      <header className="w-full text-center py-4">
        <h1 className="text-3xl font-bold text-kidpurple">Buddy Phone Fun Time</h1>
      </header>
      
      <main className="flex flex-1 flex-col items-center justify-center w-full max-w-xl gap-8">
        <div className="text-center p-6 rounded-3xl bg-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Let's Learn Together!</h2>
          <p className="text-lg">Call your friend and play fun games!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col items-center gap-4 p-6 bg-kidsoftpink rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold">Learn Numbers</h3>
            <FriendCharacter mood="happy" />
            <p className="text-center">Count with me from 1 to 5!</p>
            <Button 
              className="bg-kidblue hover:bg-blue-600 text-lg font-semibold rounded-full px-6 py-6 h-auto"
              onClick={() => handleStartCall('numbers')}
            >
              Call Friend
            </Button>
          </div>
          
          <div className="flex flex-col items-center gap-4 p-6 bg-kidsoftyellow rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold">Learn ABC</h3>
            <FriendCharacter mood="excited" />
            <p className="text-center">Let's learn the alphabet!</p>
            <Button 
              className="bg-kidorange hover:bg-orange-600 text-lg font-semibold rounded-full px-6 py-6 h-auto"
              onClick={() => handleStartCall('alphabet')}
            >
              Call Friend
            </Button>
          </div>
        </div>
      </main>
      
      <CallDialog 
        isOpen={isCallDialogOpen} 
        onClose={() => setIsCallDialogOpen(false)}
        activityType={activityType}
      />
    </div>
  );
};

export default Index;
