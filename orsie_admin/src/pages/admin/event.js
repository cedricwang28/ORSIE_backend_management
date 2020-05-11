import React, {useState, useEffect } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
import './user.css'
import { listApi,delOne,selectYearApi } from "../../services/event";




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
                    schedule:v.schedule,
                    discription:v.discription,
                    _id:v._id
                }
            })); 
        })
    }

    useEffect(() => {
        loadData()

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
        title: "Year",
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
                        delOne(record._id);
                        loadData();
                    }}>
                        <Button type="danger" style={{marginLeft:"5px"}} size="small">Delete</Button>
                    </Popconfirm>
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
                    schedule:v.schedule,
                    discription:v.discription,
                    _id:v._id
                }
            })); 
           
            
        })
        
    }

    

    return (
    
    // <Card title="Events list" className="card" extra={
    //     <Button
    //       type="primary" className="addBtn"
    //       size="small"
    //       onClick={() => props.history.push({
    //         pathname: "/admin/addevent",
    //         query: {type: "add", id:''}
    //     })}
    //     >
    //       Add New
    //     </Button>
    //   }>
    <>
        <h3>Events List</h3>
        <select className="selectYear"  onChange={handleYearFilter}>
            <option value="">--Select Year--</option>
            <option value="2020 orsie">2020 ORSIE</option>
            <option value="2019 orsie">2019 ORSIE</option>
            <option value="2018 orsie">2018 ORSIE</option>
        </select>
        <Button type="primary" shape="round" className="addBtn" onClick={() => props.history.push({
            pathname: "/admin/addevent",
            query: {type: "add", id:''}
        })}>
          Add New
        </Button>

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
