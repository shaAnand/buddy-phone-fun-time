
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function for playing sounds with better error handling
export function playSound(audioElement: HTMLAudioElement): Promise<void> {
  return audioElement.play().catch(error => {
    console.error('Error playing sound:', error);
    // Most browsers require user interaction before playing audio
    console.log('Audio playback requires user interaction first');
  });
}

// Sleep function for animations
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
