import React, {useEffect} from "react";
import Title from "antd/lib/typography/Title";
import { List, Checkbox, Avatar } from "antd";
import satelliteImage from '../images/satellite.svg';

const SatelliteList = ({
  satList,
  updateSatelliteList,
  loading,
}) => {
  const onSelectionChange = (checked, targetSatllite) => {
    const nextSatelliteList = satList.map((satellite) => {
      if (satellite.satid === targetSatllite.satid) {
        return {
          ...satellite,
          selected: checked
        }
      }
      else {
        return {
          ...satellite
        }
      }
    });

    updateSatelliteList(nextSatelliteList);
  }

  useEffect(() => {
  }, [satList])

  return (
    <div className="satellite-list-container">
      <Title level={5}>Nearby Satellites ({satList? satList.length : 0})</Title>
      <p>Select the satellite(s) you want to track on the world map</p>
      <hr/>
      <List 
        className="sat-list"
        itemLayout="horizontal"
        dataSource={satList}
        loading={loading}
        renderItem={ item => (
            <List.Item actions={[<Checkbox onChange={(e) => onSelectionChange(e.target.checked, item)} checked={item.selected} />]}>
                <List.Item.Meta
                  avatar={<Avatar src={satelliteImage} size="large" alt="satellite"/>}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
            </List.Item>
        )}
      />
    </div>
  )
}

export default SatelliteList;