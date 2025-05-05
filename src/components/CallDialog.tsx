
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FriendCharacter from './FriendCharacter';
import PhoneInterface from './PhoneInterface';
import NumberActivity from './NumberActivity';
import AlphabetActivity from './AlphabetActivity';
import CallDialogProgress from './CallDialogProgress';
import CallDialogComplete from './CallDialogComplete';
import MessageBubble from './MessageBubble';
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCallAudio } from '@/hooks/useCallAudio';
import { getCallDialogMessage } from '@/utils/callDialogMessages';

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
  
  // For numbers activity - updated to include numbers 1 through 10
  const numberSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // For alphabet activity
  const letterSequence = ['A', 'B', 'C', 'D', 'E'];

  // Get audio controls
  const { playAnswerSound, playCorrectSound } = useCallAudio(isOpen, callState);

  // Reset state when dialog opens or closes
  useEffect(() => {
    if (isOpen) {
      setCallState('ringing');
      setActivityStage(0);
      setCharacterMood('happy');
      setShowCelebration(false);
    }
  }, [isOpen]);
  
  const handleAnswerCall = () => {
    playAnswerSound();
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
    playCorrectSound();
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
  
  // Get current message
  const currentMessage = getCallDialogMessage(
    callState, 
    activityType, 
    activityType === 'numbers' ? numberSequence[activityStage] : letterSequence[activityStage]
  );

  // Get current sequence and total
  const currentSequence = activityType === 'numbers' ? numberSequence : letterSequence;
  
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
          
          <MessageBubble message={currentMessage} />
          
          {callState === 'activity' && (
            <CallDialogProgress total={currentSequence.length} current={activityStage} />
          )}
          
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
            <CallDialogComplete 
              onHangup={handleHangup}
              onPlayAgain={() => {
                setActivityStage(0);
                setCallState('activity');
              }}
              activityType={activityType}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
