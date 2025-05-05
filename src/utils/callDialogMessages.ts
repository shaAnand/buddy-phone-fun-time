
type CallState = 'ringing' | 'answered' | 'activity' | 'completed';
type ActivityType = 'numbers' | 'alphabet';

export const getCallDialogMessage = (
  callState: CallState,
  activityType: ActivityType,
  currentItem: number | string
): string => {
  if (callState === 'ringing') return "Your friend is calling!";
  if (callState === 'answered') return "Hello! Let's learn something fun!";
  if (callState === 'completed') {
    return activityType === 'numbers' 
      ? "Great job counting to 10! You did it!" 
      : "You know your letters! That's amazing!";
  }
  
  // Messages during the activity
  if (activityType === 'numbers') {
    return `Can you find number ${currentItem}?`;
  } else {
    return `Can you find letter ${currentItem}?`;
  }
};
