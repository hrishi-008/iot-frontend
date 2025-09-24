import React, { useEffect, useRef, useState } from 'react';
import { models, Report } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

export function SlideshowPage() {
  const reportRef = useRef<Report | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(2); // Start with page 2 (zero-based)
  const [isRendered, setIsRendered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  
  const powerBiUrl = "https://app.powerbi.com/reportEmbed?reportId=04a87a3a-6e65-4ec7-9fb7-3f7dd41d1e8a&autoAuth=true&ctid=b87386c8-9083-4a27-9ddf-63a3dfa33850&actionBarEnabled=true";

  // Function to switch to a specific page
  const switchToPage = async (pageIndex: number) => {
    if (!reportRef.current || !isLoaded) return;
    
    try {
      const pages = await reportRef.current.getPages();
      if (pages.length > pageIndex) {
        await pages[pageIndex].setActive();
        setCurrentPageIndex(pageIndex);
        console.log(`Switched to page ${pageIndex + 1}: ${pages[pageIndex].displayName}`);
      }
    } catch (error) {
      console.error(`Error switching to page ${pageIndex + 1}:`, error);
    }
  };

  // Set initial page when report is loaded
  useEffect(() => {
    const setInitialPage = async () => {
      if (reportRef.current && isLoaded && isRendered) {
        try {
          // Set zoom level first
          await reportRef.current.setZoom(0.85);
          console.log("Zoom level set to 85%");
          
          // Get pages and set page 2 active initially
          const pages = await reportRef.current.getPages();
          console.log(`Found ${pages.length} pages`);
          
          if (pages.length > 2) {
            await pages[2].setActive();
            setCurrentPageIndex(2);
            console.log(`Set initial page to: ${pages[2].displayName}`);
          }
        } catch (error) {
          console.error("Error setting initial page:", error);
        }
      }
    };

    // Delay slightly to ensure report is fully ready
    const timer = setTimeout(setInitialPage, 1000);
    return () => clearTimeout(timer);
  }, [isLoaded, isRendered]);

  // Slideshow effect - cycle between pages 2 and 3 every 30 seconds (for PowerBI SDK)
  useEffect(() => {
    if (!isLoaded || !isRendered || !reportRef.current || useIframeFallback) return;

    console.log("Starting slideshow timer...");

    const intervalId = setInterval(async () => {
      if (!reportRef.current) return;
      
      try {
        const pages = await reportRef.current.getPages();
        console.log(`Total pages available: ${pages.length}`);
        
        if (pages.length > 3) {
          // Toggle between page 2 (index 2) and page 3 (index 3)
          const nextPageIndex = currentPageIndex === 2 ? 3 : 2;
          await switchToPage(nextPageIndex);
        } else if (pages.length > 2) {
          // Fallback: if only 3 pages, cycle between page 1 and 2
          const nextPageIndex = currentPageIndex === 1 ? 2 : 1;
          await switchToPage(nextPageIndex);
        } else {
          console.log("Not enough pages for slideshow (need at least 3 pages)");
        }
      } catch (error) {
        console.error("Error in slideshow:", error);
      }
    }, 30000); // 30 seconds

    return () => {
      console.log("Cleaning up slideshow timer...");
      clearInterval(intervalId);
    };
  }, [isLoaded, isRendered, currentPageIndex, useIframeFallback]);

  // Fallback slideshow timer for iframe mode
  useEffect(() => {
    if (!useIframeFallback) return;

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
  }, [useIframeFallback]);

  // Auto-fallback to iframe after timeout
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.log("PowerBI SDK taking too long, falling back to iframe...");
        setUseIframeFallback(true);
        setIsLoaded(true);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(fallbackTimer);
  }, [isLoaded, hasError]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        {useIframeFallback ? (
          // Iframe fallback
          <iframe
            title="PowerBI Slideshow Report"
            width="100%"
            height="100%"
            src={powerBiUrl}
            frameBorder="0"
            allowFullScreen={true}
            className="w-full h-full min-h-[600px] border-0"
          />
        ) : (
          // PowerBI React component
          <PowerBIEmbed
            embedConfig={{
              type: 'report',
              embedUrl: powerBiUrl,
              tokenType: models.TokenType.Aad,
              settings: {
                panes: {
                  filters: {
                    visible: false
                  },
                  pageNavigation: {
                    visible: false
                  }
                },
                bars: {
                  statusBar: {
                    visible: false
                  }
                },
                background: models.BackgroundType.Transparent,
              }
            }}
            eventHandlers={new Map([
              ['loaded', () => {
                console.log('Report loaded via PowerBI SDK');
                setIsLoaded(true);
              }],
              ['rendered', () => {
                console.log('Report rendered via PowerBI SDK');
                setIsRendered(true);
              }],
              ['error', (event) => {
                console.error('PowerBI SDK Error:', event.detail);
                setHasError(true);
                // Fallback to iframe on error
                setTimeout(() => {
                  console.log('Falling back to iframe due to error...');
                  setUseIframeFallback(true);
                  setIsLoaded(true);
                }, 2000);
              }]
            ])}
            getEmbeddedComponent={(embedObject) => {
              reportRef.current = embedObject as Report;
            }}
            cssClassName="w-full h-full min-h-[600px]"
          />
        )}
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading PowerBI Report...</p>
              {hasError && (
                <p className="text-slate-500 text-sm mt-2">
                  Encountered an error, trying fallback method...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {isLoaded && (
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-4">
              <span>
                🔄 Slideshow Mode: Auto-cycling every 30 seconds
                {useIframeFallback && " (iframe mode)"}
              </span>
              {!useIframeFallback && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => switchToPage(2)}
                    className="px-2 py-1 text-xs bg-white border border-slate-300 rounded hover:bg-slate-50"
                  >
                    Page 2
                  </button>
                  <button
                    onClick={() => switchToPage(3)}
                    className="px-2 py-1 text-xs bg-white border border-slate-300 rounded hover:bg-slate-50"
                  >
                    Page 3
                  </button>
                </div>
              )}
              {useIframeFallback && (
                <span className="text-xs bg-white border border-slate-300 rounded px-2 py-1">
                  Next switch in: {timeRemaining}s
                </span>
              )}
            </div>
            <span className="font-medium">
              📄 {useIframeFallback ? 'Target' : 'Current'}: Page {currentPageIndex + 1}
            </span>
          </div>
          {useIframeFallback && (
            <div className="mt-1 text-xs text-slate-500">
              Using iframe fallback - use PowerBI's built-in page navigation controls for manual switching.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
