import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function LiveOpsMap() {
  return (
    <div className="glass p-8 rounded-3xl h-[600px]">
      <h1 className="text-3xl font-bold mb-6">🗺️ Live Ops Map</h1>
      <MapContainer center={[27.95, -82.45]} zoom={12} style={{ height: '100%', borderRadius: '16px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[27.95, -82.45]}>
          <Popup>Sea View 101 - In Progress</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}