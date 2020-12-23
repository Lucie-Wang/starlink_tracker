import React, { useState } from "react";
import {
    Geographies,
    Geography,
    Graticule,
    Sphere,
    ComposableMap,
    Marker,
    Line
} from "react-simple-maps";
// import axios from 'axios';
import { Button, InputNumber, Progress } from "antd";
import { N2YO_API_KEY, N2YO_BASE_URL, COLOR, CORS_PREFIX } from "../constants";

export const POSITION_API_BASE_URL = `${N2YO_BASE_URL}/positions`;

const progressStatus = {
    Idle: 'Idle',
    Tracking: 'Tracking...',
    Complete: 'Complete'
}

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({
    selectedSatellites,
    disabled,
    onTracking,
    observerInfo,
    initialValues
}) => {
    const [duration, setDuration] = useState(1);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [progressText, setProgressText] = useState(progressStatus.Idle);
    const [timerId, setTimerId] = useState(undefined);
    const [markersInfo, setMarkersInfo] = useState([]);
    const [currentTimestamp, setCurrentTimestamp] = useState('');

    const abortOnClick = () => {
        if (timerId) {
            clearInterval(timerId);
            setProgressPercentage(0);
            setProgressText(progressStatus.Idle);
            onTracking(false);
            setTimerId(undefined);
        }
    }

    const fetchPositions = () => {
        const { longitude, latitude, altitude } = observerInfo;

        return selectedSatellites.map((sat) => {
            const id = sat.satid;
            return fetch(`${CORS_PREFIX}/${POSITION_API_BASE_URL}/${id}/${latitude}/${longitude}/${altitude}/${duration * 60}&apiKey=${N2YO_API_KEY}`)
                .then(response => response.json());
        })
    }

    const updateMarker = (data, index) => {
        setMarkersInfo(data.map((sat) => {
            return {
                startLon: sat.positions[0].satlongitude,
                startLat: sat.positions[0].satlatitude,
                midLon: sat.positions[Math.floor(index / 2)].satlongitude,
                midLat: sat.positions[Math.floor(index / 2)].satlatitude,
                lon: sat.positions[index].satlongitude,
                lat: sat.positions[index].satlatitude,
                name: sat.info.satname
            };
        }))
    }

    const startTracking = (data) => {
        let index = 59;
        let end = data[0].positions.length - 1;
        setCurrentTimestamp(new Date(data[0].positions[index].timestamp * 1000).toString());
        updateMarker(data, index);
        const timerId = setInterval(() => {
            if (duration === 1) {
                setProgressPercentage(100);
                setProgressText(progressStatus.Complete);
                setTimerId(undefined);
                onTracking(false);
                clearInterval(timerId);
                return timerId;
            }
            index += 60;
            setProgressPercentage((index / end) * 100);
            updateMarker(data, index);
            setCurrentTimestamp(new Date(data[0].positions[index].timestamp * 1000).toString());
            if (index >= end) {
                setProgressText(progressStatus.Complete);
                setTimerId(undefined);
                onTracking(false);
                clearInterval(timerId);
            }
        }, 1000);
        return timerId;
    }

    const trackOnClick = () => {
        setProgressText(progressStatus.Tracking);
        setProgressPercentage(0);
        onTracking(true);

        Promise.all(fetchPositions()).then((data) => {
            const id = startTracking(data);
            setTimerId(id);
        }).catch(() => {
            console.log("error")
        });
    }

    return (
        <>
            <div className="track-info-panel">
                <Button
                    type="primary"
                    onClick={trackOnClick}
                    disabled={selectedSatellites.length === 0 || disabled}
                >
                    Track selected satellite(s)
        </Button>
                <span style={{ marginLeft: "20px", marginRight: "20px" }}>for</span>
                <InputNumber
                    min={1}
                    max={59}
                    defaultValue={1}
                    onChange={(value) => setDuration(value)}
                    disabled={disabled}
                />
                <span style={{ marginLeft: "20px", marginRight: "30px" }}>minutes (1~59)</span>
                <div className="progress-bar">
                    <Progress strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                        style={{ width: "550px", marginRight: "100px" }}
                        percent={progressPercentage}
                        format={() => progressText}
                    />
                    {timerId &&
                        <Button
                            type="primary"
                            onClick={abortOnClick}
                        >Abort
          </Button>
                    }</div>
            </div>
            <div className="time-stamp-container">
                <b>{currentTimestamp}</b>
            </div>
            <ComposableMap projectionConfig={{ scale: 145 }} height={480} style={{ width: "97%", marginLeft: "10px" }}>
                <Graticule stroke="#b8d6fd" strokeWidth={0.5} />
                <Sphere stroke="#b8d6fd" strokeWidth={0.5} />
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#c0d6e4"
                                stroke="#FFF"
                            />
                        ))
                    }
                </Geographies>
                {initialValues.longitude && initialValues.latitude ? <Marker coordinates={[initialValues.longitude, initialValues.latitude]}>
                    <circle r={3} fill="#F53" />
                    <text>Observer</text>
                </Marker> : null}
                {
                    markersInfo.map((mark, index) =>
                        <Line
                            coordinates={[[mark.startLon, mark.startLat], [mark.midLon, mark.midLat], [mark.lon, mark.lat]]}
                            stroke={index < COLOR.length ? COLOR[index] : COLOR[COLOR.length - 1]}
                            strokeWidth={2}
                            strokeLinecap="round"
                        />
                    )
                }
                {
                    markersInfo.map((mark, index) =>
                        <Marker coordinates={[mark.lon, mark.lat]}>
                            <circle r={4} fill={index < COLOR.length ? COLOR[index] : COLOR[COLOR.length - 1]} />
                            <text text-anchor="middle"
                                x={mark.Lon > mark.startLon ? "10" : "20"} y="20" fill="#0c66a7">{mark.name}</text>
                        </Marker>
                    )
                }
                {
                    markersInfo.map((mark, index) =>
                        <Marker coordinates={[mark.startLon, mark.startLat]}>
                            <circle r={3} fill={index < COLOR.length ? COLOR[index] : COLOR[COLOR.length - 1]} />
                        </Marker>
                    )
                }
            </ComposableMap>
        </>
    )
}

export default WorldMap;