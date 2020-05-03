import React,{useEffect,useState} from 'react'
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
    const [formData, setFormData] = useState({});

    useEffect(()=>{
        if(location.query.type == 'edit'){
            getOneById(location.query.id).then((res)=>{
                
                setFormData(res[0])
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
            popup:document.querySelector('.popupInput').value,
            year:'2020 orsie'
        }
        if(location.query.type == 'add'){
            createApi(data).then((res)=>{
                if(res.code == "success"){
                    message.success("a new event is added !");
                    
                    setFormData({
                        zone:'',
                        mapId:'',
                        name:'',
                        location:'',
                        time:'',
                        discription:'',
                        schedule:'',
                        popup:''
                    })
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
            <Input className="zoneInput" value={formData.zone} onChange={e => setFormData({...formData,zone:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="MapId"
          >
            <Input className="MapIdInput" value={formData.mapId} onChange={e => setFormData({...formData,mapId:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Name"
          >
            <Input className="NameInput" value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})}/>
          </Form.Item>
          <Form.Item label="Location">
            <Input className="LocationInput" value={formData.location} onChange={e => setFormData({...formData,location:e.target.value})}/>
          </Form.Item>
          <Form.Item label="Time">
            <Input className="timeInput" value={formData.time} onChange={e => setFormData({...formData,time:e.target.value})}/>
          </Form.Item>
          <Form.Item label="Discription">
            <Input.TextArea  className="discInput" value={formData.discription} onChange={e => setFormData({...formData,discription:e.target.value})}/>
          </Form.Item>
          <Form.Item label="Schedule">
            <Input.TextArea  className="scheduleInput" value={formData.schedule} onChange={e => setFormData({...formData,schedule:e.target.value})}/>
          </Form.Item>
          <Form.Item label="PopUps">
            <Input.TextArea  className="popupInput" value={formData.popup} onChange={e => setFormData({...formData,popup:e.target.value})}/>
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
