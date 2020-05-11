import React, {useState, useEffect } from "react";
import { Card, Table, Button, Popconfirm, Input } from "antd";
import './user.css'
import { listApi,delOne,downloadApi, searchApi, filterApi,chooseEventApi } from "../../services/user";
import { DownloadOutlined} from '@ant-design/icons';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import orsieImg from '../../assets/imgData'

const { Search } = Input;




function User(props) {

    let [dataSource,setDataSource] = useState([]);

    let loadData = ()=>{
        listApi().then((res)=>{
            
            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    name:`${v.first_name} ${v.last_name}`,
                    organization:v.organization,
                    email:v.email,
                    identity:v.role,
                    year:v.year,
                    _id:v._id
                }
            })); 
        })
    }

    useEffect(() => {
        loadData();



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
        title: "Year",
        dataIndex: "year"
        
    },{
        title:"Manage",
        render:(txt,record,index)=>{
            return (
                <div>
                    
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


    let handleDownload = ()=>{
        
        let doc = new jsPDF();

        let imgData = orsieImg

        doc.addImage(imgData,'jpg',10,10,40,20)
        
        doc.setFont('Helvetica')
        doc.setFontType('bold')
        doc.setFontSize('25')
        doc.text(75,22,'Attendant List')

        let tableBody=[];
        dataSource.forEach((item,index)=>{
            let tableRow = [index+1,item.name,item.organization,item.email,item.identity,item.year];
            tableBody.push(tableRow);
        })
    

        doc.autoTable({
            head:[['Order','Name','Organization','Email','Identity','Year']],
            body:tableBody,
            margin: { top: 42 }
        });

        doc.save('report.pdf')
    }

    let handleSearch = (value)=>{
        
        searchApi({
            searchTxt:value.trim().toLowerCase()
        }).then((res)=>{

            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    name:`${v.first_name} ${v.last_name}`,
                    organization:v.organization,
                    email:v.email,
                    identity:v.role,
                    year:v.year,
                    _id:v._id
                }
            })); 
           
            
        })
        
    }

    let handleIdFilter = ()=>{
        let value= document.querySelector('.roleFilter').options[document.querySelector('.roleFilter').selectedIndex].value

        filterApi({
            idFilter:value,
            yearFilter:document.querySelector('.yearFilter').options[document.querySelector('.yearFilter').selectedIndex].value
        }).then((res)=>{

            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    name:`${v.first_name} ${v.last_name}`,
                    organization:v.organization,
                    email:v.email,
                    identity:v.role,
                    year:v.year,
                    _id:v._id
                }
            })); 
           
            
        })
        
    }


    let handleYearFilter = ()=>{
        let value= document.querySelector('.yearFilter').options[document.querySelector('.yearFilter').selectedIndex].value

        filterApi({
            idFilter:document.querySelector('.roleFilter').options[document.querySelector('.roleFilter').selectedIndex].value,
            yearFilter:value
        }).then((res)=>{

            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    name:`${v.first_name} ${v.last_name}`,
                    organization:v.organization,
                    email:v.email,
                    identity:v.role,
                    year:v.year,
                    _id:v._id
                }
            })); 
        })
        
    }


    let handleEventFilter = ()=>{
        let value= document.querySelector('.eventFilter').options[document.querySelector('.eventFilter').selectedIndex].value

        chooseEventApi({
            eventFilter:value
        }).then((res)=>{

            setDataSource(res.map((v,i)=>{
                return {
                    id:i,
                    name:`${v.first_name} ${v.last_name}`,
                    organization:v.organization,
                    email:v.email,
                    identity:v.role,
                    year:v.year,
                    _id:v._id
                }
            })); 
           
            
        })
        
    }

    

    return (
        
    <>  
        <h3>User List</h3>
        <Button type="primary" shape="round" icon={<DownloadOutlined />} className="download report" onClick={handleDownload}>
          Report
        </Button>
        
        <Search className="search" placeholder="input search text" onSearch={handleSearch} enterButton style={{ width: 300, marginLeft:"30px",marginBottom:"2vh"}}/>
        <select className="roleFilter" onChange={handleIdFilter}>
            <option value="">-Identity Filter-</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="guest">Guest</option>
        </select>

        <select className="yearFilter" onChange={handleYearFilter}>
            <option value="">-Year Filter-</option>
            <option value="2020 orsie">2020 ORSIE</option>
            <option value="2019 orsie">2019 ORSIE</option>
            <option value="2018 orsie">2018 ORSIE</option>
        </select>

        <select className="eventFilter" onChange={handleEventFilter}>
            <option value="">-Event Filter-</option>
            <option value="1">Experience Student Entrepreneurship</option>
            <option value="2">Seed to Celebration</option>
            <option value="3">Partnerships for Social Innovation</option>
            <option value="4">Health Technology and Innovation</option>
            <option value="5">Mixed Reality</option>
            <option value="6">Experience Autonomous Vehicles</option>
            <option value="7">Research and Innovation in AI and Cybersecurity</option>
            <option value="8">Makerspace Magic</option>
            <option value="9">The 10-year Journey of Innovation</option>
            <option value="10">Student Innovations</option>
            
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

export default User
