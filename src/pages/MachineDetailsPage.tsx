import { useParams } from 'react-router-dom';

export function MachineDetailPage() {
  const { id } = useParams();

  const powerBiUrl = "https://app.powerbi.com/reportEmbed?reportId=04a87a3a-6e65-4ec7-9fb7-3f7dd41d1e8a&autoAuth=true&ctid=b87386c8-9083-4a27-9ddf-63a3dfa33850&actionBarEnabled=true";

  return (
    <div className="w-full h-full">
      <iframe
        title={`Machine ${id} Power BI Report`}
        width="100%"
        height="640"
        src={powerBiUrl}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
