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
import Login from './components/Login';  // ✅ import Login
import Blogs from './components/Blogs';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

function App() {
  const [selectedMenu, setSelectedMenu] = useState('data');
  const [visualizerList, setVisualizerList] = useState([1]);
  const [drawerVisible, setDrawerVisible] = useState(false);
   const [token, setToken] = useState(''); // ✅ token state
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
                <DataVisualizer /> {/* ✅ pass token */}
              </div>
            ))}
            <NotesSection />
          </>
        );
      case 'methodology':
        return <EpuInfoCard />;
      case 'blog':
        return <Blogs />;
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
        const disabledKeys = ['finance', 'energy', 'construction', 'it'];
        if (!disabledKeys.includes(e.key)) {
          setSelectedMenu(e.key);
        }
        setDrawerVisible(false);
      }}
      style={{
        backgroundColor: screens.md ? '#02273b' : undefined,
        fontSize: screens.md ? '15px' : '15px',
        lineHeight: screens.md ? '96px' : 'normal',
        padding: '0 20px',
      }}
    >
      <Menu.Item key="data">Data</Menu.Item>
      <Menu.Item key="methodology">Methodology</Menu.Item>
      <Menu.SubMenu key="sectors" title="Sectors">
        <Menu.Item key="finance">Finance and Insurance</Menu.Item>
        <Menu.Item key="energy">Energy and Fuels</Menu.Item>
        <Menu.Item key="construction">Construction and Infrastructure</Menu.Item>
        <Menu.Item key="it">IT and Digital Services</Menu.Item>
        </Menu.SubMenu>
      <Menu.Item key="blog">Blogs</Menu.Item>
      <Menu.Item key="partners">Partners</Menu.Item>
      <Menu.Item key="contact">Contact Us</Menu.Item>
    </Menu>
  );

  // ✅ Main return: login gate
  // if (!token) return <Login onLogin={setToken} />; // show login if not logged in
  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ backgroundColor: '#02273b', padding: '0 20px', height: '96px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '96px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/EPUlogo.png"
                  alt="Logo"
                  style={{
                    height: screens.md ? '300px' : '180px',
                    marginRight: 0,
                    marginLeft: 0, 
                    marginTop: screens.md ? 50: 30,
                    objectFit: 'contain',
                  }}
                />
              </a>
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
