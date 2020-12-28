import Title from "antd/lib/typography/Title";
import React from "react";
import { InputNumber, Form, Button, Checkbox } from "antd";

const ObserverInfo = (props) => {
  const { curLon, curLa, initialValues, setInitialValues, locationAvailable } = props;
  const onFormFinish = (observerInfo) => {
    observerInfo = {...initialValues}
    props.findSatellitesOnClick(observerInfo);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const autoFillLocation = (checked) => {
    let curLocation = { "longitude": curLon, "latitude": curLa };
    if (checked) {
      console.log(curLocation);
    } else {
      curLocation["longitude"] = 0;
      curLocation["latitude"] = 0;
    }
    setInitialValues({ ...initialValues,...curLocation })
  }

  const onChangeHandler = (e, name) => {
    setInitialValues({ ...initialValues, [name]: e })
  }

  return (
    <div className="observer-info-container">
      <Title level={5}>Observer Info</Title>
      <Checkbox disabled={!locationAvailable} style={{ margin: "10px", color: "rgb(54, 42, 88)" }} onChange={(e) => autoFillLocation(e.target.checked)} >Use Current Location</Checkbox>
      <Form
        {...layout}
        initialValues={initialValues}
        onFinish={onFormFinish}
      >
        <Form.Item
          label="Longitude"
          rules={[{
            required: true,
            message: 'Please enter a valid longitude!',
          }]}
        >
          <div className="label-text"> <img src="https://upload.wikimedia.org/wikipedia/en/3/35/Information_icon.svg" alt="information" width="15px" />
            <span className="hover-text">Observer's longitude (decimal degrees format)</span></div>
          <InputNumber min={-180} max={180} step={0.000001} style={{ width: "40%" }} value={initialValues.longitude} onChange={(e) => onChangeHandler(e, "longitude")} />
          {true ? null : <Checkbox disabled={true} style={{ marginLeft: "5px" }}></Checkbox>}
        </Form.Item>

        <Form.Item
          label="Latitude"
          rules={[{
            required: true,
            message: 'Please enter a valid latitude!',
          }]}
        >
          <div className="label-text"> <img src="https://upload.wikimedia.org/wikipedia/en/3/35/Information_icon.svg" alt="information" width="15px"/>
            <span className="hover-text">Observer's latitide (decimal degrees format)</span></div>
          <InputNumber min={-90} max={90} step={0.000001} style={{ width: "40%" }} value={initialValues.latitude} onChange={(e) => onChangeHandler(e, "latitude")} />
          {true ? null : <Checkbox disabled={true} style={{ marginLeft: "5px" }}  ></Checkbox>}
        </Form.Item>

        <Form.Item
          label="Altitude(meters)"
          rules={[{
            required: true,
            message: 'Please enter a valid altitude!',
          }]}
        >
          <div className="label-text"> <img src="https://upload.wikimedia.org/wikipedia/en/3/35/Information_icon.svg"  alt="information" width="15px" />
            <span className="hover-text">Observer's altitude above sea level in meters</span></div>
          <InputNumber min={-413} max={8850} style={{ width: "40%" }} value={initialValues.altitude} onChange={(e) => onChangeHandler(e, "altitude")}/>

        </Form.Item>

        <Form.Item
          label="Radius"
          rules={[{
            required: true,
            message: 'Please enter a valid radius!',
          }]}
        >
          <div className="label-text"> <img src="https://upload.wikimedia.org/wikipedia/en/3/35/Information_icon.svg"  alt="information" width="15px" />
            <span className="hover-text">Search radius (0-90)</span></div>
          <InputNumber min={0} max={90} style={{ width: "40%" }} placeholder="0-90" value={initialValues.radius} onChange={(e) => onChangeHandler(e, "radius")}/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={props.loading}>
            Find Satellites
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ObserverInfo;