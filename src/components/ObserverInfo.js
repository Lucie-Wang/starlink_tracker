import Title from "antd/lib/typography/Title";
import React, {useEffect} from "react";
import { InputNumber, Form, Button, Checkbox } from "antd";

const ObserverInfo = (props) => {
  const{curLon, curLa, initialValues, setInitialValues, locationAvailable} = props;
  const onFormFinish = (observerInfo) => {
    observerInfo.longitude = initialValues.longitude;
    observerInfo.latitude = initialValues.latitude;
    // console.log(observerInfo);
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
    let curLocation = {"longitude": curLon, "latitude": curLa};
      if (checked) {
      console.log(curLocation);
    } else {
      curLocation["longitude"] = 0;
      curLocation["latitude"] = 0;
    }
    setInitialValues({...curLocation})
  }

  const onChangeHandler = (e, name) => {
    setInitialValues({ ...initialValues, [name]: e })
  }
  
  return (
    <div className="observer-info-container">
      <Title level={5}>Observer Info</Title>
      <Checkbox disabled={!locationAvailable} style={{margin: "10px" , color:"rgb(54, 42, 88)"}} onChange={(e) => autoFillLocation(e.target.checked)} >Use Current Location</Checkbox>
      <Form
        {...layout}
        initialValues={initialValues}
        onFinish={onFormFinish}
      >
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[{
            required: true,
            message: 'Please enter a valid longitude!',
          }]}
        >
          <InputNumber min={-180} max={180} step={0.01} style={{ width: "40%" }} value={initialValues.longitude} onChange={(e) => onChangeHandler(e, "longitude")} />
          {true ? null : <Checkbox disabled={true} style={{ marginLeft: "5px"}}></Checkbox>}
        </Form.Item>

        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[{
            required: true,
            message: 'Please enter a valid latitude!',
          }]}
        >
          <InputNumber min={-90} max={90} step={0.01} style={{ width: "40%" }} value={initialValues.latitude} onChange={(e) => onChangeHandler(e, "latitude")} />
           {true ? null : <Checkbox disabled={true} style={{ marginLeft: "5px"}}  ></Checkbox>}
        </Form.Item>

        <Form.Item
          label="Altitude(meters)"
          name="altitude"
          rules={[{
            required: true,
            message: 'Please enter a valid altitude!',
          }]}
        >
          <InputNumber min={-413} max={8850} style={{ width: "40%" }}/>
        </Form.Item>

        <Form.Item
          label="Radius(0~90)"
          name="radius"
          rules={[{
            required: true,
            message: 'Please enter a valid radius!',
          }]}
        >
          <InputNumber min={0} max={90} style={{ width: "40%" }} />
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