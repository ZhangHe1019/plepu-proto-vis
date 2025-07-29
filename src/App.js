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
import NotesSection from './components/Note';
import PartnershipPage from './components/Partners';
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
            <NotesSection />
          </>
        );
      case 'methodology':
        return <EpuInfoCard />;
      case 'partners':
        return <PartnershipPage />;
      case 'contact':
        return <ContactAndPartnership />;
      default:
        return <DataVisualizer />;
    }
  };

  const menuItems = (
    <Menu
      theme={screens.md ? 'dark' : 'light'}
      mode={screens.md ? 'horizontal' : 'vertical'}
      selectedKeys={[selectedMenu]}
      onClick={(e) => {
        setSelectedMenu(e.key);
        setDrawerVisible(false);
      }}
      style={{
        backgroundColor: screens.md ? '#02273b' : undefined,
        fontSize: screens.md ? '15px' : '16px',
        lineHeight: screens.md ? '128px' : 'normal',
        padding: '0 20px',
      }}
    >
      <Menu.Item key="data">Data</Menu.Item>
      <Menu.Item key="methodology">Methodology</Menu.Item>
      <Menu.Item key="partners">Partners</Menu.Item>
      <Menu.Item key="contact">Contact Us</Menu.Item>
    </Menu>
  );

  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ backgroundColor: '#02273b', padding: '0 20px', height: '128px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '128px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <img
                src="/EPUlogo.png"
                alt="Logo"
                style={{
                  height: screens.md ? '320px' : '200px',
                  marginRight: 12,
                  marginTop: screens.md ? 16 : 40,
                  objectFit: 'contain',
                }}
              />
            </div>

            {screens.md ? (
              menuItems
            ) : (
              <>
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setDrawerVisible(true)}
                  style={{ color: '#fff' }}
                />
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

        <div style={{ height: '4px', backgroundColor: '#f0535a' }}></div>

        <Content
          style={{
            backgroundColor: 'white',
            padding: '40px',
            minHeight: 'calc(100vh - 136px)',
          }}
        >
          <div style={{ maxWidth: 1600, margin: '0 auto' }}>{renderContent()}</div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: '#f0f2f5',
            marginTop: 'auto',
          }}
        >
          © {new Date().getFullYear()} EPU Poland Team. All rights reserved.
        </Footer>
      </Layout>
    </Provider>
  );
}

export default App;
