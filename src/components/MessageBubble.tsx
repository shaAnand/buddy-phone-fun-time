
import React from 'react';

type MessageBubbleProps = {
  message: string;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className="bubble bg-white text-center p-2 sm:p-4 rounded-3xl max-w-[90%]">
      <p className="text-base sm:text-xl">{message}</p>
    </div>
  );
};

export default MessageBubble;
