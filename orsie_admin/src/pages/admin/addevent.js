import React,{useEffect} from 'react'
import { Form, Input, InputNumber, Button, message, Card } from 'antd';
import './user.css'
import { createApi,getOneById,modifyOne } from "../../services/event";


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

    let {location} = props.history;

    useEffect(()=>{
        if(location.query.type == 'edit'){
            getOneById(location.query.id).then((res)=>{
                document.querySelector('.zoneInput').value = res[0].zone
                document.querySelector('.MapIdInput').value = res[0].mapId
                document.querySelector('.NameInput').value = res[0].name
                document.querySelector('.LocationInput').value = res[0].location
                document.querySelector('.discInput').value = res[0].discription
                document.querySelector('.timeInput').value = res[0].time
                document.querySelector('.scheduleInput').value = res[0].schedule
                document.querySelector('.popupInput').value = res[0].popup
            })
        }
    },[])

    const onFinish = () => {
        
        let data = {
            zone:document.querySelector('.zoneInput').value,
            mapId:document.querySelector('.MapIdInput').value,
            name:document.querySelector('.NameInput').value,
            location:document.querySelector('.LocationInput').value,
            time:document.querySelector('.timeInput').value,
            discription:document.querySelector('.discInput').value,
            schedule:document.querySelector('.scheduleInput').value,
            popup:document.querySelector('.popupInput').value
        }
        if(location.query.type == 'add'){
            createApi(data).then((res)=>{
                if(res.code == "success"){
                    message.success("a new event is added !");
                    document.querySelector('.zoneInput').value = ''
                    document.querySelector('.MapIdInput').value =''
                    document.querySelector('.NameInput').value =''
                    document.querySelector('.LocationInput').value=''
                    document.querySelector('.timeInput').value=''
                    document.querySelector('.discInput').value=''
                    document.querySelector('.scheduleInput').value=''
                    document.querySelector('.popupInput').value=''
                }
            })
        }

        if(location.query.type == 'edit'){
            modifyOne(location.query.id,data).then((res)=>{
                if(res.code == "success"){
                    message.success("The event is updated !");
                    
                }
            })
        }

        
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

        <Form {...layout} className="eventForm" name="nest-messages" onFinish={onFinish} >
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
          <Form.Item label="Time">
            <Input className="timeInput"/>
          </Form.Item>
          <Form.Item label="Discription">
            <Input.TextArea  className="discInput"/>
          </Form.Item>
          <Form.Item label="Schedule">
            <Input.TextArea  className="scheduleInput"/>
          </Form.Item>
          <Form.Item label="PopUps">
            <Input.TextArea  className="popupInput"/>
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
