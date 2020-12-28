import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import ObserverInfo from "./ObserverInfo";
import { SAT_CATEGORY, N2YO_API_KEY, N2YO_BASE_URL, CORS_PREFIX } from "../constants";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";
import axios from "axios";

export const ABOVE_API_BASE_URL = `${N2YO_BASE_URL}/above`;

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [satList, setSatList] = useState([]);
  const [trakcing, setTracking] = useState(false);
  const [observerInfo, setObserverInfo] = useState({});
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [curLa, setCurLa] = useState({});
  const [curLon, setCurLon] = useState({});
  const [initialValues, setInitialValues] = useState({
    longitude: 0,
    latitude: 0,
    altitude: 0,
    radius: 0
  })

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurLa(Number((position.coords.latitude).toFixed(6)));
        setCurLon(Number((position.coords.longitude).toFixed(6)));
        setLocationAvailable(true);
      });
    } else {
      axios.get('http://ipinfo.io/json', null)
        .then(res => {
          if ('loc' in res) {
            let loc = res.loc.split(',');
            setCurLa(Number((loc[0]).toFixed(2)));
            setCurLon(Number((loc[1]).toFixed(2)));
            setLocationAvailable(true);
          } else {
            console.warn('Getting location by IP failed.');
          }
        })
        .catch(res=> console.log(res.error))
    }
  }, [])

  const findSatellitesOnClick = (nextObserverInfo) => {
    setObserverInfo(nextObserverInfo);
    const { longitude, latitude, altitude, radius } = nextObserverInfo;
    setLoading(true);
    fetch(`${CORS_PREFIX}/${ABOVE_API_BASE_URL}/${latitude}/${longitude}/${altitude}/${radius}/${SAT_CATEGORY}&apiKey=${N2YO_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setSatList(data.above.map((satellite) => {
          return {
            ...satellite,
            selected: false,
          }
        }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <Row>
      <Col span={8}>
        <ObserverInfo
          findSatellitesOnClick={findSatellitesOnClick}
          loading={loading}
          disabled={trakcing}
          locationAvailable={locationAvailable}
          curLa={curLa}
          curLon={curLon}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
        <SatelliteList
          satList={satList}
          updateSatelliteList={setSatList}
          loading={loading}
          disabled={trakcing}
        />
      </Col>
      <Col span={16}>
        <WorldMap
          selectedSatellites={satList.filter(sat => sat.selected)}
          onTracking={setTracking}
          disabled={trakcing}
          observerInfo={observerInfo}
          initialValues={initialValues}
        />
      </Col>
    </Row>
  )
}

export default Main;
