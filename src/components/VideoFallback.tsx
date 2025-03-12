import React from 'react';

const VideoFallback = () => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-header-bg to-background flex items-center justify-center"
    >
      <div className="text-white text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" 
          height="64" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mx-auto mb-4 opacity-50"
        >
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
        <p className="text-lg opacity-70">Video background will appear here</p>
      </div>
    </div>
  );
};

export default VideoFallback;
