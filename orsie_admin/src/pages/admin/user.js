import React from 'react'
import { Card, Table, Button, Popconfirm } from "antd";

function user() {
    return (
        <Card
      title="Users  List"
      
    >
      <Table
        rowKey="_id"
        rowClassName={record => (record.onSale ? "" : "bg-red")}
        pagination={{
          
          defaultPageSize: 2
          
        }}
        
        bordered
        
      />
    </Card>
    )
}

export default user
