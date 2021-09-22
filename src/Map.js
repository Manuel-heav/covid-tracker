import React from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
  } from "react-simple-maps";
import './Map.css'
// const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = () => {
    return (
        <div className="map">
              <ComposableMap className="map__mapContainer">
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo}/>
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
        </div>
    )
}

export default Map
