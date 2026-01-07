import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TatilKonumlari.css';
import { FiMapPin } from 'react-icons/fi';

// Leaflet varsayılan ikon sorununu düzelt
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Dünya genelindeki popüler tatil konumları
const tatilKonumlari = [
  {
    id: 1,
    name: 'Maldivler',
    position: [3.2028, 73.2207],
    description: 'Hint Okyanusu\'nda tropikal cennet, kristal berraklığında sular'
  },
  {
    id: 2,
    name: 'Bali, Endonezya',
    position: [-8.3405, 115.0920],
    description: 'Egzotik adalar, tapınaklar ve muhteşem plajlar'
  },
  {
    id: 3,
    name: 'Santorini, Yunanistan',
    position: [36.3932, 25.4615],
    description: 'Ege\'nin en romantik adası, beyaz evler ve gün batımı'
  },
  {
    id: 4,
    name: 'Mauritius',
    position: [-20.3484, 57.5522],
    description: 'Hint Okyanusu\'nda lüks tatil cenneti'
  },
  {
    id: 5,
    name: 'Seyşeller',
    position: [-4.6796, 55.4920],
    description: 'Egzotik plajlar ve tropikal doğa harikası'
  },
  {
    id: 6,
    name: 'Bora Bora, Fransız Polinezyası',
    position: [-16.5004, -151.7415],
    description: 'Pasifik\'te lüks tatil adası, su üstü bungalovlar'
  },
  {
    id: 7,
    name: 'Phuket, Tayland',
    position: [7.8804, 98.3923],
    description: 'Tayland\'ın en popüler tatil adası, egzotik plajlar'
  },
  {
    id: 8,
    name: 'Dubai, BAE',
    position: [25.2048, 55.2708],
    description: 'Lüks oteller, alışveriş ve modern mimari'
  },
  {
    id: 9,
    name: 'Mısır',
    position: [26.8206, 30.8025],
    description: 'Piramitler, antik tarih ve Kızıldeniz\'in muhteşem plajları'
  },
  {
    id: 10,
    name: 'Fiji',
    position: [-17.7134, 178.0650],
    description: 'Pasifik\'te tropikal cennet, mercan resifleri'
  },
  {
    id: 11,
    name: 'Maldives - Ari Atoll',
    position: [3.8500, 72.9000],
    description: 'Maldivler\'in en güzel atolü, su altı dünyası'
  },
  {
    id: 12,
    name: 'Zanzibar, Tanzanya',
    position: [-6.1659, 39.1991],
    description: 'Hint Okyanusu\'nda tarihi ada, baharat adası'
  }
];

const TatilKonumlari = () => {
  return (
    <div className="tatil-konumlari-page">
      <div className="page-header">
        <h1>Tatil Konumları</h1>
        <p>Dünya'nın en güzel tatil destinasyonlarını keşfedin</p>
      </div>
      
      <div className="map-container">
        <MapContainer
          center={[10.0, 70.0]}
          zoom={3}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          minZoom={2}
          maxZoom={18}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {tatilKonumlari.map((konum) => (
            <Marker
              key={konum.id}
              position={konum.position}
              icon={DefaultIcon}
            >
              <Popup>
                <div className="popup-content">
                  <h3>
                    <FiMapPin className="popup-icon" />
                    {konum.name}
                  </h3>
                  <p>{konum.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="konumlar-listesi">
        <h2>Popüler Tatil Destinasyonları</h2>
        <div className="konumlar-grid">
          {tatilKonumlari.map((konum) => (
            <div key={konum.id} className="konum-kart">
              <div className="konum-kart-header">
                <FiMapPin className="konum-icon" />
                <h3>{konum.name}</h3>
              </div>
              <p>{konum.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TatilKonumlari;

