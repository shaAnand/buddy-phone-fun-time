
import { useState, useEffect } from 'react';

type CallState = 'ringing' | 'answered' | 'activity' | 'completed';

export const useCallAudio = (isOpen: boolean, callState: CallState) => {
  const [ringSound] = useState(new Audio('/ring.mp3'));
  const [answerSound] = useState(new Audio('/answer.mp3'));
  const [correctSound] = useState(new Audio('/correct.mp3'));

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

  const playAnswerSound = () => {
    ringSound.pause();
    answerSound.play().catch(e => console.log('Audio play error:', e));
  };

  const playCorrectSound = () => {
    correctSound.play().catch(e => console.log('Audio play error:', e));
  };

  return {
    playAnswerSound,
    playCorrectSound
  };
};
