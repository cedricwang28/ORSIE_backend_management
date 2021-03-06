import React,{useEffect,useState} from 'react'
import { Form, Input, InputNumber, Button, message, Card,Cascader } from 'antd';
import './user.css'
import { createApi,getOneById,modifyOne,getYearsApi } from "../../services/event";


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
let selectedYear;
  

function AddEvent(props) {

    let {location} = props.history;
    const [formData, setFormData] = useState({});
    const [options, setOptions] = useState([
      {
        value: 'option1',
        label: 'option1',
      }
    ]);

    useEffect(()=>{
        if(location.query.type == 'edit'){
            getOneById(location.query.id).then((res)=>{
                
                setFormData(res[0])
            })
        }


        getYearsApi().then((res)=>{
          setOptions(res.map((v,i)=>{
            return {
              value:v.year,
              label:v.year
            }
        })); 
          
        })

    },[])

    const onFinish = () => {
        
        let data = {
            zone:document.querySelector('.zoneInput').value,
            mapId:document.querySelector('.MapIdInput').value,
            name:document.querySelector('.NameInput').value,
            location:document.querySelector('.LocationInput').value,
            time:document.querySelector('.timeInput').value,
            discription:document.querySelector('.discInput').value,
            // schedule:document.querySelector('.scheduleInput').value,
            // popup:document.querySelector('.popupInput').value,
            year:selectedYear
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
                        discription:''
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



      const onChooseYear = (value)=>{
        
        selectedYear = value[0]
        
      }


    
      return (
        <Card title="Add/Edit Workshop"  extra={
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
            label="Select Event"
          >
            <Cascader options={options}  onChange={onChooseYear}  placeholder="Please select event" />
          </Form.Item>
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
          <Form.Item label="Description">
            <Input.TextArea  className="discInput" value={formData.discription} onChange={e => setFormData({...formData,discription:e.target.value})}/>
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
