import React, { useEffect, useState } from 'react';

export function SlideshowPageSimple() {
  const [currentPageIndex, setCurrentPageIndex] = useState(2); // Start with page 2 (zero-based)
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  
  const powerBiUrl = "https://app.powerbi.com/reportEmbed?reportId=04a87a3a-6e65-4ec7-9fb7-3f7dd41d1e8a&autoAuth=true&ctid=b87386c8-9083-4a27-9ddf-63a3dfa33850&actionBarEnabled=true";

  // Countdown timer and page switching
  useEffect(() => {
    if (!isLoaded) return;

    const intervalId = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Switch page and reset timer
          setCurrentPageIndex(current => current === 2 ? 3 : 2);
          return 30;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [isLoaded]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    console.log('PowerBI iframe loaded');
  };

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        <iframe
          title="PowerBI Slideshow Report"
          width="100%"
          height="100%"
          src={powerBiUrl}
          frameBorder="0"
          allowFullScreen={true}
          onLoad={handleIframeLoad}
          className="w-full h-full min-h-[600px] border-0"
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading PowerBI Report...</p>
              <p className="text-slate-500 text-sm mt-2">Please ensure you're signed in to PowerBI</p>
            </div>
          </div>
        )}
      </div>
      
      {isLoaded && (
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-4">
              <span>🔄 Slideshow Mode: Auto-cycling every 30 seconds</span>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white border border-slate-300 rounded px-2 py-1">
                  Next switch in: {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            <span className="font-medium">
              📄 Target Page: {currentPageIndex + 1}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Note: Use PowerBI's built-in page navigation controls to manually switch pages. 
            Auto-cycling is simulated - configure actual auto-advance in PowerBI report settings.
          </div>
        </div>
      )}
    </div>
  );
}
