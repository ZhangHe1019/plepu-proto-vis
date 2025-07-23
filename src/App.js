import React, { useState } from 'react';
import EpuInfoCard from './components/InfoCard';
import { Provider } from 'react-redux';
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Grid,
} from 'antd';
import DataVisualizer from './components/DataVisualizer';
import ContactAndPartnership from './components/Contact';
import { store } from './app/store';
import 'antd/dist/reset.css';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

function App() {
  const [selectedMenu, setSelectedMenu] = useState('data');
  const [visualizerList, setVisualizerList] = useState([1]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const addVisualizer = () => {
    setVisualizerList([...visualizerList, Date.now()]);
  };

  const removeVisualizer = (id) => {
    setVisualizerList(visualizerList.filter((item) => item !== id));
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
        return <ContactAndPartnership />;
      default:
        return <DataVisualizer />;
    }
  };

  const menuItems = (
    <Menu
      theme="dark"
      mode={screens.md ? 'horizontal' : 'vertical'}
      selectedKeys={[selectedMenu]}
      onClick={(e) => {
        setSelectedMenu(e.key);
        setDrawerVisible(false);
      }}
      style={{ backgroundColor: screens.md ? '#001f3f' : undefined }}
    >
      <Menu.Item key="data">Data</Menu.Item>
      <Menu.Item key="methodology">Methodology</Menu.Item>
      <Menu.Item key="contact">Contact Us</Menu.Item>
    </Menu>
  );

  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ backgroundColor: '#001f3f', padding: '0 20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '64px',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/EPUlogo.png" alt="Logo" style={{ height: 40, marginRight: 12 }} />
              <h1 style={{
                color: 'white',
                margin: 0,
                fontSize: 20,
                whiteSpace: 'nowrap',
              }}>
                EPU Poland
              </h1>
            </div>

            {screens.md ? (
              menuItems
            ) : (
              <>
                <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} style={{ color: '#fff' }} />
                <Drawer
                  title="Menu"
                  placement="right"
                  onClose={() => setDrawerVisible(false)}
                  open={drawerVisible}
                >
                  {menuItems}
                </Drawer>
              </>
            )}
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
