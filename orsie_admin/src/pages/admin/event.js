import React, {useState, useEffect } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
import './user.css'
import { listApi,delOne } from "../../services/event";



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
      title: "Order",
      key: "_id",
      width: 20,
      align: "center",
      render: (txt, record, index) => index + 1
    },
    {
      title: "Zone",
      dataIndex: "zone"
    },
    {
      title: "MapId",
      dataIndex: "mapId"
      
    },
    {
        title: "Name",
        dataIndex: "name"
        
    },
    {
        title: "Location",
        dataIndex: "location"
        
    },{
        title:"Manage",
        render:(txt,record,index)=>{
            return (
                <div>
                    <Button type="primary" size="small" onClick={() => props.history.push("/admin/addevent")}>Edit</Button>
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

    

    return (
    
    <Card title="Events list" className="card" extra={
        <Button
          type="primary" className="addBtn"
          size="small"
          onClick={() => props.history.push("/admin/addevent")}
        >
          Add New
        </Button>
      }>
        
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

    </Card>
    
    )
}

export default Event
