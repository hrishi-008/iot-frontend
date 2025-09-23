import React, { useEffect, useRef } from 'react';
import { models, Report } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

export function SlideshowPage() {
  const reportRef = useRef<Report | null>(null);

  const powerBiUrl = "https://app.powerbi.com/reportEmbed?reportId=04a87a3a-6e65-4ec7-9fb7-3f7dd41d1e8a&autoAuth=true&ctid=b87386c8-9083-4a27-9ddf-63a3dfa33850&pageName=ReportSection&actionBarEnabled=true";

  useEffect(() => {
    const setFirstPageActive = async () => {
      if (reportRef.current) {
        try {
          const pages = await reportRef.current.getPages();
          if (pages.length > 0) {
            await pages[0].setActive();
            console.log(`Active page was set to: "${pages[0].displayName}"`);
          }
        } catch (errors) {
          console.log(errors);
        }
      }
    };

    const timer = setTimeout(setFirstPageActive, 2000); // Wait for the report to load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full">
      <PowerBIEmbed
        embedConfig={{
          type: 'report',
          embedUrl: powerBiUrl,
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false
              }
            },
            background: models.BackgroundType.Transparent,
          }
        }}
        eventHandlers={new Map([
          ['rendered', (event) => {
            if (reportRef.current) {
              setFirstPageActive();
            }
          }],
        ])}
        getEmbeddedComponent={(embedObject) => {
          reportRef.current = embedObject as Report;
        }}
        cssClassName={"w-full h-full"}
      />
    </div>
  );
}
