
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FriendCharacter from './FriendCharacter';
import PhoneInterface from './PhoneInterface';
import NumberActivity from './NumberActivity';
import AlphabetActivity from './AlphabetActivity';
import { Button } from '@/components/ui/button';
import { CheckCircle, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type CallDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  activityType: 'numbers' | 'alphabet';
};

const CallDialog = ({
  isOpen,
  onClose,
  activityType
}: CallDialogProps) => {
  const [callState, setCallState] = useState<'ringing' | 'answered' | 'activity' | 'completed'>('ringing');
  const [activityStage, setActivityStage] = useState(0);
  const [characterMood, setCharacterMood] = useState<'happy' | 'thinking' | 'excited' | 'waiting'>('happy');
  const [showCelebration, setShowCelebration] = useState(false);
  const isMobile = useIsMobile();
  
  // Audio elements
  const [ringSound] = useState(new Audio('/ring.mp3'));
  const [answerSound] = useState(new Audio('/answer.mp3'));
  const [correctSound] = useState(new Audio('/correct.mp3'));
  
  // For numbers activity
  const numberSequence = [1, 2, 3, 4, 5];
  
  // For alphabet activity
  const letterSequence = ['A', 'B', 'C', 'D', 'E'];

  // Reset state when dialog opens or closes
  useEffect(() => {
    if (isOpen) {
      setCallState('ringing');
      setActivityStage(0);
      setCharacterMood('happy');
      setShowCelebration(false);
    }
  }, [isOpen]);
  
  useEffect(() => {
    // Play ringing sound when dialog opens
    if (isOpen && callState === 'ringing') {
      ringSound.loop = true;
      ringSound.play().catch(e => console.log('Audio play error:', e));
    }
    
    // Cleanup
    return () => {
      ringSound.pause();
      answerSound.pause();
      correctSound.pause();
    };
  }, [isOpen, callState, ringSound, answerSound, correctSound]);
  
  const handleAnswerCall = () => {
    ringSound.pause();
    answerSound.play().catch(e => console.log('Audio play error:', e));
    setCallState('answered');
    
    // Simulate friend greeting before starting activity
    setTimeout(() => {
      setCallState('activity');
    }, 2000);
  };
  
  const handleHangup = () => {
    onClose();
  };
  
  const handleCorrectAnswer = () => {
    correctSound.play().catch(e => console.log('Audio play error:', e));
    setCharacterMood('excited');
    setShowCelebration(true);
    
    // Move to next question or complete the activity
    setTimeout(() => {
      setShowCelebration(false);
      if (activityStage < (activityType === 'numbers' ? numberSequence.length - 1 : letterSequence.length - 1)) {
        setActivityStage(prev => prev + 1);
        setCharacterMood('happy');
      } else {
        setCallState('completed');
      }
    }, 1500);
  };
  
  // Create messages based on the call state
  const getMessage = () => {
    if (callState === 'ringing') return "Your friend is calling!";
    if (callState === 'answered') return "Hello! Let's learn something fun!";
    if (callState === 'completed') return activityType === 'numbers' ? 
      "Great job counting! You did it!" : 
      "You know your letters! That's amazing!";
    
    // Messages during the activity
    if (activityType === 'numbers') {
      return `Can you find number ${numberSequence[activityStage]}?`;
    } else {
      return `Can you find letter ${letterSequence[activityStage]}?`;
    }
  };

  // Progress indicator
  const renderProgress = () => {
    if (callState !== 'activity') return null;
    
    const total = activityType === 'numbers' ? numberSequence.length : letterSequence.length;
    
    return (
      <div className="flex items-center justify-center gap-1 sm:gap-2 my-2">
        {Array.from({ length: total }).map((_, idx) => (
          <div 
            key={idx} 
            className={cn(
              "w-2 h-2 sm:w-3 sm:h-3 rounded-full",
              idx <= activityStage ? "bg-kidorange" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-kidsoftyellow p-4 sm:p-8 rounded-3xl border-4 border-kidorange max-w-[90vw] sm:max-w-md">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Celebration overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-4xl sm:text-6xl animate-bounce-light">
                <CheckCircle className="text-kidgreen w-16 sm:w-20 h-16 sm:h-20" />
              </div>
            </div>
          )}
          
          <FriendCharacter 
            size={isMobile ? "md" : "lg"} 
            mood={characterMood} 
            className="mb-2 sm:mb-4"
            animated={callState !== 'ringing'}
          />
          
          <div className="bubble bg-white text-center p-2 sm:p-4 rounded-3xl max-w-[90%]">
            <p className="text-base sm:text-xl">{getMessage()}</p>
          </div>
          
          {renderProgress()}
          
          {callState === 'ringing' && (
            <PhoneInterface 
              status="ringing" 
              onAnswer={handleAnswerCall} 
              onHangup={handleHangup}
            />
          )}
          
          {callState === 'activity' && (
            activityType === 'numbers' ? (
              <NumberActivity
                currentNumber={numberSequence[activityStage]}
                onCorrectAnswer={handleCorrectAnswer}
                className="w-full"
              />
            ) : (
              <AlphabetActivity
                currentLetter={letterSequence[activityStage]}
                onCorrectAnswer={handleCorrectAnswer}
                className="w-full"
              />
            )
          )}
          
          {callState === 'completed' && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2 sm:gap-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="text-xl sm:text-2xl animate-bounce-light" style={{ animationDelay: `${idx * 0.1}s` }}>
                    ⭐
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  onClick={handleHangup}
                  className="bg-kidblue text-white rounded-full px-4 sm:px-6 py-1 sm:py-2"
                >
                  Bye bye!
                </Button>
                
                <Button
                  onClick={() => {
                    setActivityStage(0);
                    setCallState('activity');
                  }}
                  className="bg-kidgreen text-white rounded-full px-4 sm:px-6 py-1 sm:py-2"
                >
                  Play again!
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
