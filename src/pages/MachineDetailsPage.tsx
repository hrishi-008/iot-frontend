import { useParams } from 'react-router-dom';

export function MachineDetailPage() {
  const { id } = useParams();

  // TODO: Replace with your actual Power BI report URL
  const powerBiUrl = `https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&autoAuth=true&ctid=YOUR_TENANT_ID&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9`;

  return (
    <div className="w-full h-full">
      <iframe
        title={`Machine ${id} Power BI Report`}
        width="100%"
        height="100%"
        src={powerBiUrl}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
