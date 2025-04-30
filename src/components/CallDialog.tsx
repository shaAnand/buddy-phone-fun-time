
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FriendCharacter from './FriendCharacter';
import PhoneInterface from './PhoneInterface';
import NumberActivity from './NumberActivity';
import AlphabetActivity from './AlphabetActivity';
import { Button } from '@/components/ui/button';
import { CheckCircle, PhoneCall } from 'lucide-react';

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
      <div className="flex items-center justify-center gap-2 my-2">
        {Array.from({ length: total }).map((_, idx) => (
          <div 
            key={idx} 
            className={cn(
              "w-3 h-3 rounded-full",
              idx <= activityStage ? "bg-kidorange" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-kidsoftyellow p-8 rounded-3xl border-4 border-kidorange max-w-md">
        <div className="flex flex-col items-center gap-6">
          {/* Celebration overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-6xl animate-bounce-light">
                <CheckCircle className="text-kidgreen w-20 h-20" />
              </div>
            </div>
          )}
          
          <FriendCharacter 
            size="lg" 
            mood={characterMood} 
            className="mb-4"
            animated={callState !== 'ringing'}
          />
          
          <div className="bubble bg-white text-center p-4 rounded-3xl max-w-[80%]">
            <p className="text-xl">{getMessage()}</p>
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
              <div className="flex gap-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="text-2xl animate-bounce-light" style={{ animationDelay: `${idx * 0.1}s` }}>
                    ⭐
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={handleHangup}
                  className="bg-kidblue text-white rounded-full px-6 py-2"
                >
                  Bye bye!
                </Button>
                
                <Button
                  onClick={() => {
                    setActivityStage(0);
                    setCallState('activity');
                  }}
                  className="bg-kidgreen text-white rounded-full px-6 py-2"
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
