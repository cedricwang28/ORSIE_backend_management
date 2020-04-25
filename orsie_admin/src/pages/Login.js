import React from 'react'
import { Form, Input, Button, Checkbox,Card,message } from 'antd';
import "./login.css";
import { setToken } from "../utils/auth";
import { loginApi } from "../services/auth";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

function Login(props) {
    
      
    const onFinish = values => {
        console.log('Success:', values);
        // setToken(values.username);
        // props.history.push("/admin");
        loginApi({
            userName: values.username,
            password: values.password
          })
            .then(res => {
              if (res.code === "success") {
                message.success("logged in");
                setToken(res.token);
                props.history.push("/admin");
              } else {
                message.info(res.message);
              }
              
            })
            
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
    <div>
     <div className="adminLogin"></div>
     <Card title="Orsie Admin System" className="login-form">
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username" className="formItem"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password" className="formItem"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

    </Card>

    </div>
    )
}

export default Login
