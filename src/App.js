import React, { useState } from 'react';
import EpuInfoCard from './InfoCard';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout, Menu, Button, Form, Input, message } from 'antd';
import DataVisualizer from './components/DataVisualizer';
import { store } from './app/store';
import 'antd/dist/reset.css';
import { CloseOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

function App() {
  const [selectedMenu, setSelectedMenu] = useState('data');
  const [visualizerList, setVisualizerList] = useState([1]);
  const [form] = Form.useForm();

  const addVisualizer = () => {
    setVisualizerList([...visualizerList, Date.now()]);
  };

  const removeVisualizer = (id) => {
    setVisualizerList(visualizerList.filter((item) => item !== id));
  };

  const handleContactSubmit = (values) => {
    console.log('Contact Form Values:', values);
    message.success('Thank you for reaching out!');
    form.resetFields();
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'data':
        return (
          <>
            <Button type="primary" onClick={addVisualizer} style={{ marginBottom: '20px' }}>
              + Add Dashboard
            </Button>
            {visualizerList.map((id) => (
              <div
                key={id}
                style={{
                  border: '1px solid #ddd',
                  padding: '20px',
                  marginBottom: '20px',
                  position: 'relative',
                  background: '#fff',
                }}
              >
                <CloseOutlined
                  onClick={() => removeVisualizer(id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '12px',
                    cursor: 'pointer',
                    color: '#999',
                  }}
                />
                <DataVisualizer />
              </div>
            ))}
          </>
        );
      case 'methodology':
        return <EpuInfoCard />;
      case 'contact':
        return (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2>Contact Us</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleContactSubmit}
              style={{ marginTop: '20px' }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="Your email" />
              </Form.Item>

              <Form.Item
                label="Comments"
                name="comments"
                rules={[{ required: true, message: 'Please enter your comments' }]}
              >
                <TextArea rows={4} placeholder="Your comments or message" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      default:
        return <DataVisualizer />;
    }
  };

  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ backgroundColor: '#001f3f', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
            <img src="/EPUlogo.png" alt="Logo" style={{ height: 40, marginRight: 20 }} />
            <h1 style={{ color: 'white', margin: 0, fontSize: 24, flexGrow: 1 }}>EPU Poland</h1>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[selectedMenu]}
              onClick={(e) => setSelectedMenu(e.key)}
              style={{ backgroundColor: '#001f3f' }}
            >
              <Menu.Item key="data">Data</Menu.Item>
              <Menu.Item key="methodology">Methodology</Menu.Item>
              <Menu.Item key="contact">Contact Us</Menu.Item>
            </Menu>
          </div>
        </Header>

        <div style={{ height: '4px', backgroundColor: '#ccc' }}></div>

        <Content style={{ backgroundColor: 'white', padding: '40px', minHeight: 'calc(100vh - 136px)' }}>
          {renderContent()}
        </Content>

        <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5', marginTop: 'auto' }}>
          © {new Date().getFullYear()} EPU Poland Team. All rights reserved.
        </Footer>
      </Layout>
    </Provider>
  );
}

export default App;
