import React, {useState, useEffect } from "react";
import {Table, Button} from "antd";
import './user.css'
import {chooseEventApi } from "../../services/user";
import { DownloadOutlined} from '@ant-design/icons';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import orsieImg from '../../assets/imgData'




function Attendee(props) {
    let {location} = props.history;

    let [dataSource,setDataSource] = useState([]);


    useEffect(() => {
        

        document.querySelector('.listTitle').innerHTML = `${location.query.name} Attendee List`
        
        chooseEventApi({eventFilter:location.query.zone}).then((res)=>{
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


    },[]);

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
        
    }]


    let handleDownload = ()=>{
        
        let doc = new jsPDF();

        let imgData = orsieImg

        doc.addImage(imgData,'jpg',10,10,40,20)
        
        doc.setFont('Helvetica')
        doc.setFontType('bold')
        doc.setFontSize('24')
        doc.text(75,22,`Attendant List`)

        doc.setFontType('normal')
        doc.setFontSize('14')

        doc.text(10,40,`Workshop: ${location.query.name}`)

        let tableBody=[];
        dataSource.forEach((item,index)=>{
            let tableRow = [index+1,item.name,item.organization,item.email,item.identity,item.year];
            tableBody.push(tableRow);
        })
    

        doc.autoTable({
            head:[['Order','Name','Organization','Email','Identity','Year']],
            body:tableBody,
            margin: { top: 50 }
        });

        doc.save('event attendee.pdf')
    }

    



    

    return (
        
    <>  
        <h3 className="listTitle">Event Attendee List</h3>
        <Button
              type="primary" 
              size="middle"
              style={{marginLeft:"30px",transform:"translate(0,-5px)"}}
              onClick={() => props.history.push("/admin/event")}
            >
              Back
        </Button>

        <Button style={{transform:"translate(0,-5px)"}}
        type="primary" shape="round" icon={<DownloadOutlined />} className="download report" onClick={handleDownload}>
            Attendee List
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

export default Attendee
