
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FriendCharacter from './FriendCharacter';
import PhoneInterface from './PhoneInterface';
import NumberActivity from './NumberActivity';
import AlphabetActivity from './AlphabetActivity';

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
  const [characterMood, setCharacterMood] = useState<'happy' | 'thinking' | 'excited'>('happy');
  
  // Audio elements
  const [ringSound] = useState(new Audio('/ring.mp3'));
  const [answerSound] = useState(new Audio('/answer.mp3'));
  const [correctSound] = useState(new Audio('/correct.mp3'));
  
  // For numbers activity
  const numberSequence = [1, 2, 3, 4, 5];
  
  // For alphabet activity
  const letterSequence = ['A', 'B', 'C', 'D', 'E'];
  
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
    
    // Move to next question or complete the activity
    setTimeout(() => {
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
    if (callState === 'completed') return "Great job! You did it!";
    
    // Messages during the activity
    if (activityType === 'numbers') {
      return `Can you find number ${numberSequence[activityStage]}?`;
    } else {
      return `Can you find letter ${letterSequence[activityStage]}?`;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-kidsoftyellow p-8 rounded-3xl border-4 border-kidorange max-w-md">
        <div className="flex flex-col items-center gap-6">
          <FriendCharacter 
            size="lg" 
            mood={characterMood} 
            className="mb-4"
          />
          
          <div className="bubble bg-white text-center p-4 rounded-3xl max-w-[80%]">
            <p className="text-xl">{getMessage()}</p>
          </div>
          
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
            <button
              onClick={handleHangup}
              className="btn-kid bg-kidblue text-white"
            >
              Bye bye!
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
