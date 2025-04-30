
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FriendCharacter from '@/components/FriendCharacter';
import CallDialog from '@/components/CallDialog';

const Index = () => {
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<'numbers' | 'alphabet'>('numbers');
  const [characterMood, setCharacterMood] = useState<'happy' | 'thinking' | 'excited' | 'waiting'>('happy');
  
  const handleStartCall = (type: 'numbers' | 'alphabet') => {
    setActivityType(type);
    setIsCallDialogOpen(true);
  };
  
  const handleHoverActivity = (type: 'numbers' | 'alphabet' | null) => {
    if (type === 'numbers') {
      setCharacterMood('excited');
    } else if (type === 'alphabet') {
      setCharacterMood('happy');
    } else {
      setCharacterMood('waiting');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-kidsoftblue to-kidsoftgreen flex flex-col items-center p-4">
      <header className="w-full text-center py-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-kidpurple">Buddy Phone Fun Time</h1>
      </header>
      
      <main className="flex flex-1 flex-col items-center justify-center w-full max-w-xl gap-8 my-4">
        <div className="text-center p-6 rounded-3xl bg-white shadow-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-2">Let's Learn Together!</h2>
          <p className="text-lg">Call your friend and play fun games!</p>
          <div className="mt-4">
            <FriendCharacter mood={characterMood} size="md" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div 
            className="flex flex-col items-center gap-4 p-6 bg-kidsoftpink rounded-3xl shadow-lg hover:shadow-xl transition-all"
            onMouseEnter={() => handleHoverActivity('numbers')}
            onMouseLeave={() => handleHoverActivity(null)}
          >
            <h3 className="text-xl font-bold">Learn Numbers</h3>
            <div className="flex justify-center space-x-3">
              {[1, 2, 3].map(num => (
                <div key={num} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold shadow animate-bounce-light" style={{ animationDelay: `${num * 0.2}s` }}>
                  {num}
                </div>
              ))}
            </div>
            <p className="text-center">Count with me from 1 to 5!</p>
            <Button 
              className="bg-kidblue hover:bg-blue-600 text-lg font-semibold rounded-full px-6 py-6 h-auto"
              onClick={() => handleStartCall('numbers')}
            >
              Call Friend
            </Button>
          </div>
          
          <div 
            className="flex flex-col items-center gap-4 p-6 bg-kidsoftyellow rounded-3xl shadow-lg hover:shadow-xl transition-all"
            onMouseEnter={() => handleHoverActivity('alphabet')}
            onMouseLeave={() => handleHoverActivity(null)}
          >
            <h3 className="text-xl font-bold">Learn ABC</h3>
            <div className="flex justify-center space-x-3">
              {['A', 'B', 'C'].map((letter, idx) => (
                <div key={letter} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold shadow animate-bounce-light" style={{ animationDelay: `${idx * 0.2}s` }}>
                  {letter}
                </div>
              ))}
            </div>
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
      
      <footer className="w-full text-center py-4 text-sm text-gray-600">
        <p>Created for toddlers with ❤️</p>
      </footer>
      
      <CallDialog 
        isOpen={isCallDialogOpen} 
        onClose={() => setIsCallDialogOpen(false)}
        activityType={activityType}
      />
    </div>
  );
};

export default Index;
