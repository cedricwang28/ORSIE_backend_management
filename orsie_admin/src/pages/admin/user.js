import React, {useState, useEffect } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
import './user.css'
import { listApi,delOne } from "../../services/user";



function User(props) {

    let [dataSource,setDataSource] = useState([]);

    useEffect(() => {
        listApi().then((res)=>{
            
            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    name:`${v.first_name} ${v.last_name}`,
                    organization:v.organization,
                    email:v.email,
                    identity:v.role,
                    _id:v._id
                }

            }));
           
        })
      }, [dataSource]);

    const columns = [
    {
      title: "Order",
      key: "_id",
      width: 20,
      align: "center",
      render: (txt, record, index) => index + 1
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Organization",
      dataIndex: "organization"
      
    },
    {
        title: "Email",
        dataIndex: "email"
        
    },
    {
        title: "Identity",
        dataIndex: "identity"
        
    },{
        title:"Manage",
        render:(txt,record,index)=>{
            return (
                <div>
                    <Button type="primary" size="small">Edit</Button>
                    <Popconfirm title="Are you sure to delete?" onCancel={()=>{console.log('cancel')}} onConfirm={()=>{
                        delOne(record._id);
                    }}>
                        <Button type="danger" style={{marginLeft:"5px"}} size="small">Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    }]

    

    return (
        
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
    
    )
}

export default User
