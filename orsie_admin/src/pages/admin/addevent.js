import React from 'react'
import { Form, Input, InputNumber, Button, message, Card } from 'antd';
import './user.css'
import { createApi } from "../../services/event";


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };


function AddEvent(props) {
    const onFinish = () => {
        
        let data = {
            zone:document.querySelector('.zoneInput').value,
            mapId:document.querySelector('.MapIdInput').value,
            name:document.querySelector('.NameInput').value,
            location:document.querySelector('.LocationInput').value,
            discription:document.querySelector('.discInput').value,
        }
        createApi(data).then((res)=>{
            if(res.code == "success"){
                message.success("a new event is added !");
                document.querySelector('.zoneInput').value = ''
                document.querySelector('.MapIdInput').value =''
                document.querySelector('.NameInput').value =''
                document.querySelector('.LocationInput').value=''
                document.querySelector('.discInput').value=''
            }
        })
      };
    
      return (
        <Card title="Add Event"  extra={
            <Button
              type="primary" 
              size="middle"
              onClick={() => props.history.push("/admin/event")}
            >
              Back
            </Button>
          }>

        <Form {...layout} className="eventForm" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            label="Zone"
          >
            <Input className="zoneInput"/>
          </Form.Item>
          <Form.Item
            label="MapId"
          >
            <Input className="MapIdInput" />
          </Form.Item>
          <Form.Item
            label="Name"
            
          >
            <Input className="NameInput" />
          </Form.Item>
          <Form.Item label="Location">
            <Input className="LocationInput"/>
          </Form.Item>
          <Form.Item label="Discription">
            <Input.TextArea  className="discInput"/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        </Card>
      );
}

export default AddEvent
