import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "../data/hospital.json";
// import mapStyles from "./mapStyles";

function Map() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 13.73051961, lng: 100.36696244 }}
    //   defaultOptions={{ styles: mapStyles }}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.dcode}
          position={{
            lat: park.geometry.coordinates[0],
            lng: park.geometry.coordinates[1]
          }}
          onClick={() => {
            setSelectedHospital(park);
          }}
          icon={{
            url: `/pin.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedHospital && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedHospital(null);
          }}
          position={{
            lat: selectedHospital.geometry.coordinates[0],
            lng: selectedHospital.geometry.coordinates[1]
          }}
        >
          <div>
            <p>{selectedHospital.properties.name}</p>
            <p>{selectedHospital.properties.address}</p>
            <a href={"tel:[" + selectedHospital.properties.tel + "]"}><p>{selectedHospital.properties.tel}</p></a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}