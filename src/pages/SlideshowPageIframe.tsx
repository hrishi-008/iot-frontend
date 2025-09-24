import React, { useEffect, useRef, useState } from 'react';

export function SlideshowPageIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(2); // Start with page 2 (zero-based)
  const [isLoaded, setIsLoaded] = useState(false);
  
  const powerBiUrl = "https://app.powerbi.com/reportEmbed?reportId=04a87a3a-6e65-4ec7-9fb7-3f7dd41d1e8a&autoAuth=true&ctid=b87386c8-9083-4a27-9ddf-63a3dfa33850&actionBarEnabled=true";

  useEffect(() => {
    const handleIframeLoad = () => {
      setIsLoaded(true);
      
      // Try to interact with PowerBI via postMessage if possible
      if (iframeRef.current?.contentWindow) {
        try {
          // This is a more limited approach but might work for basic navigation
          const iframe = iframeRef.current;
          
          // Wait a bit for PowerBI to fully load
          setTimeout(() => {
            // Send a message to try to navigate to page 2
            iframe.contentWindow?.postMessage({
              action: 'switchPage',
              pageIndex: 2
            }, '*');
          }, 3000);
          
        } catch (error) {
          console.log('Cannot directly control iframe due to CORS restrictions');
        }
      }
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  // For iframe approach, we'll show a simple timer and page indicator
  // The actual page switching would need to be handled by PowerBI's built-in features
  // or through their JavaScript API with proper authentication
  useEffect(() => {
    if (!isLoaded) return;

    const intervalId = setInterval(() => {
      // Toggle between page 2 and page 3 for display purposes
      setCurrentPageIndex(prev => prev === 2 ? 3 : 2);
      console.log(`Slideshow timer: Should be on page ${currentPageIndex === 2 ? 3 : 2}`);
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [isLoaded, currentPageIndex]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          title="PowerBI Slideshow Report"
          width="100%"
          height="100%"
          src={powerBiUrl}
          frameBorder="0"
          allowFullScreen={true}
          className="w-full h-full"
          style={{ minHeight: '600px' }}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading PowerBI Report...</p>
            </div>
          </div>
        )}
      </div>
      
      {isLoaded && (
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Slideshow Mode: Cycling every 30 seconds</span>
            <span>Target Page: {currentPageIndex === 2 ? 'Page 2' : 'Page 3'}</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Note: Use PowerBI's built-in navigation controls or configure auto-cycling in the PowerBI report settings.
          </div>
        </div>
      )}
    </div>
  );
}
