import React, {useState, useEffect } from "react";
import { Table, Button, Popconfirm,Input,message } from "antd";
import './user.css'
import { listApi,delOne,selectYearApi,addYearApi,getYearsApi,updateYearApi,getActiveApi} from "../../services/event";

const { Search } = Input;


function Event(props) {

    let [dataSource,setDataSource] = useState([]);

    let loadData = ()=>{
        listApi().then((res)=>{
            
            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    zone:v.zone,
                    mapId:v.mapId,
                    name:v.name,
                    location:v.location,
                    time:v.time,
                    year:v.year,
                    discription:v.discription,
                    _id:v._id
                }
            })); 
        })
    }

    let loadYears = ()=>{
        getYearsApi().then((res)=>{
            
            res.forEach(item => {
                document.querySelector('.selectYear').innerHTML += `<option value="${item.year}">${item.year}</option> `

                document.querySelector('.activeYear').innerHTML += `<option value="${item.year}">${item.year}</option> `
            });

            getActiveApi().then((res)=>{
                console.log(res[0].year);
                let theIndex;
                document.querySelector('.activeYear').querySelectorAll('option').forEach((v,i)=>{
                    if(v.value == res[0].year){
                        theIndex = i;
                        return;
                    }
                })
                document.querySelector('.activeYear')[theIndex].selected = true;
            });
            
        })
    }

    useEffect(() => {
        loadData();
        loadYears();
        
      }, []);

    const columns = [
    {
      title: "Zone",
      dataIndex: "zone"
    },
    {
        title: "Name",
        dataIndex: "name"  
    },
    {
        title: "Location",
        dataIndex: "location"
        
    },{
        title: "Time",
        dataIndex: "time"
        
    },{
        title: "Event",
        dataIndex: "year"
        
    },{
        title:"Manage",
        render:(txt,record,index)=>{
            return (
                <div>
                    <Button type="primary" size="small" onClick={() => props.history.push({
                        pathname: "/admin/addevent",
                        query: {type: "edit", id:record._id}
                    })}>Edit</Button>
                    <Popconfirm title="Are you sure to delete?" onCancel={()=>{console.log('cancel')}} onConfirm={()=>{
                        
                        delOne(record._id).then(()=>{
                            loadData();
                        });
                        
                    }}>
                        <Button type="danger" style={{marginLeft:"5px"}} size="small">Delete</Button>
                    </Popconfirm>

                    <Button onClick={() => props.history.push({
                        pathname: "/admin/eventAttendee",
                        query: {name:record.name,zone:record.zone}
                    })}
                     type="solid" size="small" style={{marginLeft:"5px"}}>Attendees</Button>

                </div>
            )
        }
    }]



    let handleYearFilter = ()=>{
        let value= document.querySelector('.selectYear').options[document.querySelector('.selectYear').selectedIndex].value

        selectYearApi({
            selectYear:value
        }).then((res)=>{

            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    zone:v.zone,
                    mapId:v.mapId,
                    name:v.name,
                    location:v.location,
                    time:v.time,
                    year:v.year,
                    discription:v.discription,
                    _id:v._id
                }
            })); 
        })
        
    }


    let handleAddEvent = (value)=>{
        let newvalue = value.trim().toLowerCase();
        addYearApi({
            year:newvalue,
            active:false
        }).then((res)=>{

            if(res.code === "success"){
                message.success("New event is added !");  
                document.querySelector('.selectYear').innerHTML += `<option value="${newvalue}">${newvalue}</option> `
                document.querySelector('.activeYear').innerHTML += `<option value="${newvalue}">${newvalue}</option> `
            }
            if(res.code === "taken"){
                message.info("The event already exists !");   
            }
            if(res.code === "error"){
                message.info("Something went wrong !");   
            }
            
        })
        
    }


    let handleActiveYear = ()=>{
        let value= document.querySelector('.activeYear').options[document.querySelector('.activeYear').selectedIndex].value;
        console.log(value);
        
        updateYearApi({activeyear:value}).then((res)=>{
            console.log(res);
            
        })
    }
    

    return (
    
    
    <>
        <h3>Workshops List</h3>

        <Search className="addyear" placeholder="input new event name" onSearch={handleAddEvent}
         enterButton="Add Event" style={{ width: 270, marginLeft:"20px",marginBottom:"2vh"}}/>

        <select className="selectYear"  onChange={handleYearFilter}>
            <option value="">--Event Filter --</option> 
        </select>

        <Button type="primary" shape="round" className="addBtn" onClick={() => props.history.push({
            pathname: "/admin/addevent",
            query: {type: "add", id:''}
        })}>
          Add Workshop
        </Button>

        Active Event:
        <select className="activeYear"  onChange={handleActiveYear}>
            
        </select>

      <Table
        rowClassName="rows"
        rowKey="_id"
        pagination={{
          
          defaultPageSize: 6
          
        }}
        
        bordered
        columns={columns}
        dataSource={dataSource}
      />
    </>
    
    
    )
}

export default Event
